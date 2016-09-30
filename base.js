import 'xterm/addons/fit/fit';
import 'xterm/addons/fullscreen/fullscreen';

import qs       from 'qs';
import Stream   from 'stream';
import Terminal from 'xterm';

let params = qs.parse(location.search.slice(1));

class Fallthrough extends Stream.Transform {
    _transform(chunk, encoding, callback) {
        callback(null, chunk);
    }
}

process.env = {};

if (params.debugRender)
    process.env.OHUI_DEBUG_RENDER = 1;

process.stdin = new Fallthrough();
process.stdin.setRawMode = () => {};

process.stdout = new Fallthrough();

let terminal = window.terminal = new Terminal();
terminal.open(document.querySelector(`body`));

process.stdout.on('data', data => {
    terminal.write(data.toString());
});

window.setImmediate = setTimeout;
window.clearImmediate = clearTimeout;

function updateTerminalSize() {

    terminal.toggleFullscreen();
    terminal.fit();

    process.stdout.columns = terminal.cols;
    process.stdout.rows = terminal.rows;

    process.stdout.emit(`resize`);

}

window.addEventListener('resize', () => {
    updateTerminalSize();
});

updateTerminalSize();
