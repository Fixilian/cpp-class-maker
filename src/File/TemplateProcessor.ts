import { getPosition } from "../Utility/Strings";

/**
 * TemplateProcessor transforms text according to the following rules:
 * Parses expressions of the form ${var=value}, ${var=const}, ${var}, ${const}, or ${value}.
 * Replaces each expression with its resolved value, and saves value of var.
 * - var, const and value may contain letters, digits, '_' or '-'.
 * - var, const and value cannot be empty.
 */
export class TemplateProcessor {
    /** Constant values. */
    private constants: Map<string, string>;

    /**
     * @param constants constant values.
     */
    constructor(constants: Map<string, string>) {
        this.constants = constants;
    }

    /**
     * Processes text.
     * 
     * @param text text to process.
     * @returns processed text.
     * @throws Error if var, const or value are empty or contain invalid characters
     * or if var is redeclared. 
     */
    process(text: string): string {
        const variables = new Map<string, string>();
        this.constants.forEach((value, key) => {
            variables.set(key, value);
        });

        // Match: ${var=value}, ${var=const}, ${var}, ${const}, or ${value}
        // Allow temporarily empty parts for manual validation.
        const pattern = /\$\{([^}=]*)(?:=([^}]*))?\}/g;
        const replacedText = text.replace(
            pattern, 
            (_, varPart: string, valuePart: string | undefined, offset: number) => {
                return this.replaceExpression(text, varPart, valuePart, offset, variables);
            }
        );
        return replacedText;
    }

    /**
     * Replacer for String.prototype.replace().
     */
    private replaceExpression(
        text: string,
        varPart: string, 
        valuePart: string | undefined, 
        offset: number, 
        variables: Map<string, string>) {
        
        let replacer: string;

        if (valuePart) {
            // Case: ${var=value} or ${var=const}
            let variable = varPart.trim();
            let value = valuePart.trim();

            this.validateIdentifier(variable, 'variable identifier', text, offset);
            this.validateIdentifier(value, 'value', text, offset);

            if (variables.has(variable)) {
                throw new Error(`Cannot redeclare variable ${variable}`);
            }
            const constant = this.constants.get(value);
            if (constant) {
                replacer = constant;
            } else {
                replacer = value;
            }
            variables.set(variable, replacer);
        } else {
            // Case: ${var}, ${const} or ${value}
            let value = varPart.trim();
            this.validateIdentifier(value, 'value', text, offset);

            const variable = variables.get(value);
            if (variable) {
                replacer = variable;
            } else {
                replacer = value;
            }
        }

        return replacer;
    }

    /**
     * Validates that an identifier is non-empty and matches the allowed pattern.
     * Allowed characters: letters (A-Z, a-z), digits (0-9), underscore (_), and dash (-).
     *
     * @throws Error if the identifier is empty or invalid.
     * @param value the string to validate.
     * @param kind descriptive name for error messages (e.g. "variable", "value").
     * @param text full text to compute line and column for error message.
     * @param offset zero-based character index within the text.
     */
    private validateIdentifier(value: string, kind: string, text:string, offset: number): void {
        const identifierPattern = /^[A-Za-z0-9_-]+$/;

        if (value.length === 0) {
            const { line, column } = getPosition(text, offset);
            throw new Error(`Empty ${kind} at ${line + 1}:${column + 1}`);
        }
        if (!identifierPattern.test(value)) {
            const { line, column } = getPosition(text, offset);
            throw new Error(`Invalid ${kind} "${value}" at ${line + 1}:${column + 1}`);
        }
    }
}
