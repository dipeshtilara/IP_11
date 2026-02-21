
let listData = [10, 20, 30, 40];

export function renderVisualizer(container) {
    container.innerHTML = `
        <div class="visualizer-container">
            <div class="list-wrapper" id="list-display">
                <!-- Nodes generated here -->
            </div>
        </div>

        <div class="controls">
            <div class="control-group">
                <input type="text" id="val-input" placeholder="Value" style="width: 100px;">
                <button class="btn btn-primary" id="btn-append">Append</button>
            </div>
            
            <div class="control-group">
                <input type="number" id="idx-input" placeholder="Idx" style="width: 60px;">
                <button class="btn btn-primary" id="btn-insert">Insert</button>
            </div>

            <div class="control-group">
                <button class="btn btn-accent" id="btn-pop">Pop</button>
                <button class="btn btn-accent" id="btn-remove">Remove Val</button>
            </div>

             <div class="control-group">
                <button class="btn btn-outline" id="btn-sort" style="border:1px solid var(--primary); color:var(--primary);">Sort</button>
                <button class="btn btn-outline" id="btn-reverse" style="border:1px solid var(--primary); color:var(--primary);">Reverse</button>
                <button class="btn btn-outline" id="btn-clear" style="border:1px solid red; color:red;">Clear</button>
            </div>
        </div>
        
        <div class="card" style="margin-top: 1rem; background: #fafafa;">
            <h3>Console Output:</h3>
            <div id="console-log" style="font-family: 'Fira Code', monospace; color: #555; margin-top: 0.5rem; min-height: 1.5rem;">
                Ready.
            </div>
        </div>
    `;

    const listDisplay = document.getElementById('list-display');
    const consoleLog = document.getElementById('console-log');

    // Inputs
    const valInput = document.getElementById('val-input');
    const idxInput = document.getElementById('idx-input');

    // Enter Key Support
    valInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') document.getElementById('btn-append').click();
    });
    idxInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') document.getElementById('btn-insert').click();
    });

    // Helper: Log message
    const log = (msg) => {
        consoleLog.textContent = `>>> ${msg}`;
        // flash effect
        consoleLog.style.color = 'var(--primary)';
        setTimeout(() => consoleLog.style.color = '#555', 300);
    };

    // Helper: Create HTML Node
    const createNodeFn = (val, idx, isNew = false) => {
        const node = document.createElement('div');
        node.className = `list-node ${isNew ? 'entering' : ''}`;
        node.innerHTML = `
            <div class="node-box">${val}</div>
            <div class="node-index">${idx}</div>
        `;
        return node;
    };

    // Render Full List (for init, sort, reverse)
    const render = () => {
        listDisplay.innerHTML = '';
        listData.forEach((val, idx) => {
            listDisplay.appendChild(createNodeFn(val, idx));
        });
    };

    // Initial Render
    render();

    // --- Actions ---

    // Append
    document.getElementById('btn-append').addEventListener('click', () => {
        const val = valInput.value;
        if (val === '') return;

        listData.push(val);
        const newNode = createNodeFn(val, listData.length - 1, true);
        listDisplay.appendChild(newNode);

        // Remove animation class after animation
        setTimeout(() => newNode.classList.remove('entering'), 400);

        log(`list.append(${val})`);
        valInput.value = '';
        valInput.focus();
    });

    // Pop
    document.getElementById('btn-pop').addEventListener('click', () => {
        if (listData.length === 0) {
            log("Error: Pop from empty list");
            return;
        }

        const nodes = listDisplay.children;
        const lastNode = nodes[nodes.length - 1];

        lastNode.classList.add('leaving');
        log(`list.pop() -> returned ${listData[listData.length - 1]}`);

        setTimeout(() => {
            listData.pop();
            render(); // Re-render to ensure indices update if needed (not needed for pop but good practice)
        }, 400);
    });

    // Insert
    document.getElementById('btn-insert').addEventListener('click', () => {
        const val = valInput.value;
        let idx = parseInt(idxInput.value);

        if (val === '' || isNaN(idx)) return;

        // Python behavior: clamp index
        if (idx < 0) idx = 0;
        if (idx > listData.length) idx = listData.length;

        listData.splice(idx, 0, val);
        log(`list.insert(${idx}, ${val})`);
        render(); // Full re-render is easiest for insert to act correctly visually

        // Highlight the new node? 
        // We can find it and animate it
        const nodes = listDisplay.children;
        if (nodes[idx]) {
            nodes[idx].classList.add('entering');
            setTimeout(() => nodes[idx].classList.remove('entering'), 400);
        }

        valInput.value = '';
        idxInput.value = '';
    });

    // Remove (Value)
    document.getElementById('btn-remove').addEventListener('click', () => {
        const val = valInput.value; // inputs are strings by default
        if (val === '') return;

        // Try to find numeric match if possible, else string match
        // Our listData can be mixed strings/numbers based on input
        // Simple check:
        const idx = listData.findIndex(item => item == val);

        if (idx === -1) {
            log(`ValueError: list.remove(x): x not in list`);
            return;
        }

        // Animate removal
        const nodes = listDisplay.children;
        if (nodes[idx]) {
            nodes[idx].classList.add('leaving');
        }

        log(`list.remove(${val})`);

        setTimeout(() => {
            listData.splice(idx, 1);
            render();
        }, 400);
    });

    // Sort
    document.getElementById('btn-sort').addEventListener('click', () => {
        // Simple sort (coercing types might be weird but it's a demo)
        listData.sort((a, b) => {
            if (!isNaN(a) && !isNaN(b)) return a - b;
            return String(a).localeCompare(String(b));
        });
        log(`list.sort()`);
        render();
    });

    // Reverse
    document.getElementById('btn-reverse').addEventListener('click', () => {
        listData.reverse();
        log(`list.reverse()`);
        render();
    });

    // Clear
    document.getElementById('btn-clear').addEventListener('click', () => {
        listData = [];
        log(`list.clear()`);
        render();
    });
}
