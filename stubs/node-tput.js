import { isEqual }  from 'lodash';

export default function tput(name, ... args) {

    switch (name) {

        case `setaf`: {
            if (args[0] <= 0x07) {
                return `\u001b[${30 + args[0]}m`;
            } else if (args[0] <= 0x0f) {
                return `\u001b[${90 + args[0]}m`;
            } else if (args[0] <= 0xe7) {
                return `\u001b[38;5;${args[0]}m`;
            } else {
                return `\u001b[38;5;${args[0]}m`;
            }
        } break;

        case `setab`: {
            if (args[0] <= 0x07) {
                return `\u001b[${40 + args[0]}m`;
            } else if (args[0] <= 0x0f) {
                return `\u001b[${100 + args[0]}m`;
            } else if (args[0] <= 0xe7) {
                return `\u001b[38;5;${args[0]}m`;
            } else {
                return `\u001b[48;5;${args[0]}m`;
            }
        } break;

        case `cup`: {
            return `\u001b[${args[0]+1};${args[1]+1}H`;
        } break;

        case `rs2`: {
            return `\u001bc\u001b[?1000l\u001b[?25h`;
        } break;

        case `clear`: {
            return `\u001b[H\u001b[J`;
        } break;

        case `sgr0`: {
            return `\u001b[m\u000f`;
        } break;

        case `civis`: {
            return `\u001b[?25l`;
        } break;

        default: {
            throw new Error(`Unstubbed terminal capability: "${name}"`);
        } break;

    }

}
