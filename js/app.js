
// ==========================================
// MODULE: THEORY
// ==========================================
const theoryContent = {
    intro: `
        <div class="theory-card fade-in">
            <h2>Introduction to Lists</h2>
            <p>In Python, a <strong>List</strong> is a collection of items. Lists are ordered, changeable (mutable), and allow duplicate values.</p>
            <p>Think of a list like a shopping basket where you can keep adding items, remove them, or rearrange them.</p>
            
            <div class="code-block">
                <span class="comment"># A simple list of fruits</span><br>
                fruits = [<span class="string">"apple"</span>, <span class="string">"banana"</span>, <span class="string">"cherry"</span>]<br>
                print(fruits)
            </div>
        </div>
    `,
    create: `
        <div class="theory-card fade-in">
            <h2>Creating Lists</h2>
            <p>Lists are created using square brackets <code>[]</code>. They can contain items of different data types (integers, strings, floats, even other lists!).</p>

            <div class="code-block">
                <span class="comment"># Empty list</span><br>
                my_list = []<br><br>
                <span class="comment"># Mixed data types</span><br>
                data = [<span class="number">10</span>, <span class="string">"Hello"</span>, <span class="number">3.14</span>, <span class="keyword">True</span>]
            </div>
        </div>
    `,
    access: `
        <div class="theory-card fade-in">
            <h2>Accessing Elements</h2>
            <p>You can access items by referring to the index number. Python uses <strong>zero-based indexing</strong>.</p>
            <ul>
                <li>Index 0: First item</li>
                <li>Index 1: Second item</li>
                <li>Index -1: Last item (Negative Indexing)</li>
            </ul>

            <div class="code-block">
                fruits = [<span class="string">"apple"</span>, <span class="string">"banana"</span>, <span class="string">"cherry"</span>]<br><br>
                print(fruits[<span class="number">0</span>])  <span class="comment"># Output: apple</span><br>
                print(fruits[<span class="number">-1</span>]) <span class="comment"># Output: cherry</span>
            </div>
        </div>
    `,
    operations: `
        <div class="theory-card fade-in">
            <h2>List Operations</h2>
            <p>Common operations include:</p>
            <ul>
                <li><strong>Concatenation (+)</strong>: Joining two lists.</li>
                <li><strong>Repetition (*)</strong>: Repeating a list multiple times.</li>
                <li><strong>Membership (in)</strong>: Checking if an item exists.</li>
            </ul>

            <div class="code-block">
                list1 = [<span class="number">1</span>, <span class="number">2</span>]<br>
                list2 = [<span class="number">3</span>, <span class="number">4</span>]<br><br>
                print(list1 + list2)  <span class="comment"># [1, 2, 3, 4]</span><br>
                print(list1 * <span class="number">2</span>)      <span class="comment"># [1, 2, 1, 2]</span>
            </div>
        </div>
    `,
    slicing: `
        <div class="theory-card fade-in">
            <h2>List Slicing</h2>
            <p>Slicing returns a range of characters. Syntax: <code>list[start:stop:step]</code></p>
            
            <div class="code-block">
                nums = [<span class="number">0</span>, <span class="number">1</span>, <span class="number">2</span>, <span class="number">3</span>, <span class="number">4</span>, <span class="number">5</span>]<br><br>
                print(nums[<span class="number">2</span>:<span class="number">5</span>])  <span class="comment"># [2, 3, 4] (end index exclusive)</span><br>
                print(nums[ :<span class="number">3</span>])   <span class="comment"># [0, 1, 2]</span><br>
                print(nums[<span class="number">::-1</span>])  <span class="comment"># [5, 4, 3, 2, 1, 0] (Reverse)</span>
            </div>
        </div>
    `,
    methods: `
        <div class="theory-card fade-in">
            <h2>Built-in Methods</h2>
            <p>Python provides many methods to manipulate lists:</p>
            <ul>
                <li><code>append(x)</code>: Adds x to the end.</li>
                <li><code>insert(i, x)</code>: Inserts x at index i.</li>
                <li><code>pop(i)</code>: Removes item at index i.</li>
                <li><code>remove(x)</code>: Removes first occurrence of x.</li>
                <li><code>sort()</code>: Sorts the list.</li>
            </ul>
        </div>
    `
};

function renderTheory(container) {
    container.innerHTML = `
        <div class="theory-nav" style="display:flex; gap:1rem; margin-bottom:2rem; flex-wrap:wrap;">
            ${Object.keys(theoryContent).map(key =>
        `<button class="btn btn-outline" data-topic="${key}" 
                  style="border:1px solid var(--primary); color:var(--primary); background:transparent;">
                  ${key.charAt(0).toUpperCase() + key.slice(1)}
                </button>`
    ).join('')}
        </div>
        <div id="theory-display">
            ${theoryContent.intro}
        </div>
    `;

    // Event delegation for theory nav
    container.querySelector('.theory-nav').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const topic = e.target.dataset.topic;
            document.getElementById('theory-display').innerHTML = theoryContent[topic];

            // Active state styling
            container.querySelectorAll('button').forEach(b => {
                b.style.backgroundColor = 'transparent';
                b.style.color = 'var(--primary)';
            });
            e.target.style.backgroundColor = 'var(--primary)';
            e.target.style.color = 'white';
        }
    });
}

// ==========================================
// MODULE: VISUALIZER
// ==========================================
let listData = [10, 20, 30, 40];

function renderVisualizer(container) {
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

        <div class="card" style="margin-top: 2rem; background: #fff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
            <h3 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--accent); padding-bottom: 0.5rem; display: inline-block;">Python List Methods Reference</h3>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; margin-top: 0.5rem; font-size: 0.95rem;">
                    <thead>
                        <tr style="background-color: var(--primary); color: white;">
                            <th style="padding: 12px; text-align: left; border-top-left-radius: 6px; width: 20%;">Function / Method</th>
                            <th style="padding: 12px; text-align: left; width: 35%;">Purpose</th>
                            <th style="padding: 12px; text-align: left; width: 25%;">Example</th>
                            <th style="padding: 12px; text-align: left; border-top-right-radius: 6px; width: 20%;">Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; color: var(--accent); white-space: nowrap;"><strong>len(list)</strong></td>
                            <td style="padding: 12px; color: #475569;">Returns the total number of elements in the list.</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #334155;">L = [1, 2, 3]<br>print(len(L))</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #10b981;">3</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;">
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; color: var(--accent); white-space: nowrap;"><strong>list(sequence)</strong></td>
                            <td style="padding: 12px; color: #475569;">Converts another sequence (like a string, tuple) into a list.</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #334155;">s = "Hi"<br>print(list(s))</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #10b981;">['H', 'i']</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; color: var(--accent); white-space: nowrap;"><strong>list.append(x)</strong></td>
                            <td style="padding: 12px; color: #475569;">Adds a single element <code>x</code> to the end of the list.</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #334155;">L = [1]<br>L.append(2)</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #10b981;">[1, 2]</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;">
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; color: var(--accent); white-space: nowrap;"><strong>list.insert(i, x)</strong></td>
                            <td style="padding: 12px; color: #475569;">Adds an element <code>x</code> at a specific index <code>i</code>.</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #334155;">L = [1, 3]<br>L.insert(1, 2)</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #10b981;">[1, 2, 3]</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; color: var(--accent); white-space: nowrap;"><strong>list.extend(iterable)</strong></td>
                            <td style="padding: 12px; color: #475569;">Adds multiple elements (from another list or iterable) to the end.</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #334155;">L = [1]<br>L.extend([2, 3])</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #10b981;">[1, 2, 3]</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;">
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; color: var(--accent); white-space: nowrap;"><strong>list.count(x)</strong></td>
                            <td style="padding: 12px; color: #475569;">Returns how many times a specific value <code>x</code> appears.</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #334155;">L = [1, 2, 1]<br>print(L.count(1))</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #10b981;">2</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; color: var(--accent); white-space: nowrap;"><strong>list.index(x)</strong></td>
                            <td style="padding: 12px; color: #475569;">Returns the index of the first occurrence of a value <code>x</code>.</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #334155;">L = ['a', 'b', 'c']<br>print(L.index('b'))</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #10b981;">1</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;">
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; color: var(--accent); white-space: nowrap;"><strong>list.remove(x)</strong></td>
                            <td style="padding: 12px; color: #475569;">Deletes the first occurrence of a specific value <code>x</code>.</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #334155;">L = [1, 2, 3]<br>L.remove(2)</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #10b981;">[1, 3]</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; color: var(--accent); white-space: nowrap;"><strong>list.pop([i])</strong></td>
                            <td style="padding: 12px; color: #475569;">Removes and returns an element at a given index <code>i</code> (or the last one if omitted).</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #334155;">L = [1, 2, 3]<br>res = L.pop(1)</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #10b981;">res: 2<br>L: [1, 3]</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;">
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; color: var(--accent); white-space: nowrap;"><strong>list.reverse()</strong></td>
                            <td style="padding: 12px; color: #475569;">Reverses the order of items in the list in place.</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #334155;">L = [1, 2, 3]<br>L.reverse()</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #10b981;">[3, 2, 1]</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; color: var(--accent); white-space: nowrap;"><strong>list.sort()</strong></td>
                            <td style="padding: 12px; color: #475569;">Sorts the list in ascending (or descending) order in place.</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #334155;">L = [3, 1, 2]<br>L.sort()</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #10b981;">[1, 2, 3]</td>
                        </tr>
                        <tr style="background-color: #f8fafc;">
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; color: var(--accent); white-space: nowrap;"><strong>min(), max(), sum()</strong></td>
                            <td style="padding: 12px; color: #475569;">Finds the smallest, largest, or total sum of numeric elements in the list. (Built-in functions)</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #334155;">L = [1, 2, 3]<br>print(sum(L))</td>
                            <td style="padding: 12px; font-family: 'Fira Code', monospace; font-size: 0.85em; color: #10b981;">6</td>
                        </tr>
                    </tbody>
                </table>
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

        // Calculate negative index (e.g. if length is 4: index 3 is -1, index 2 is -2)
        const negIdx = idx - listData.length;

        node.innerHTML = `
            <div class="node-box">${val}</div>
            <div class="node-index">${idx} <br><span style="color:#a8a29e; font-size: 0.8em">(${negIdx})</span></div>
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

    // Helper: Live Update Indices after shifts
    const updateIndices = () => {
        const activeNodes = Array.from(listDisplay.children).filter(n => !n.classList.contains('leaving'));
        activeNodes.forEach((node, idx) => {
            const negIdx = idx - activeNodes.length;
            const indexDiv = node.querySelector('.node-index');
            if (indexDiv) {
                indexDiv.innerHTML = `${idx} <br><span style="color:#a8a29e; font-size: 0.8em">(${negIdx})</span>`;
            }
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

        // Trigger reflow to start animation
        void newNode.offsetWidth;
        newNode.classList.remove('entering');

        updateIndices();

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

        const activeNodes = Array.from(listDisplay.children).filter(n => !n.classList.contains('leaving'));
        const lastNode = activeNodes[activeNodes.length - 1];

        lastNode.classList.add('leaving');
        log(`list.pop() -> returned ${listData[listData.length - 1]}`);

        listData.pop();
        updateIndices(); // Live update indices of remaining elements

        setTimeout(() => {
            if (lastNode && lastNode.parentNode) lastNode.remove();
        }, 400);
    });

    // Insert
    document.getElementById('btn-insert').addEventListener('click', () => {
        const val = valInput.value;
        const inputIdx = parseInt(idxInput.value);

        if (val === '' || isNaN(inputIdx)) return;

        // Python behavior: handle negative index and clamping
        let actualIdx = inputIdx;
        if (actualIdx < 0) {
            actualIdx = listData.length + actualIdx;
            if (actualIdx < 0) actualIdx = 0;
        }
        if (actualIdx > listData.length) actualIdx = listData.length;

        listData.splice(actualIdx, 0, val);
        log(`list.insert(${inputIdx}, ${val})`);

        const newNode = createNodeFn(val, actualIdx, true);

        // Insert physically into DOM
        const activeNodes = Array.from(listDisplay.children).filter(n => !n.classList.contains('leaving'));
        if (actualIdx < activeNodes.length) {
            listDisplay.insertBefore(newNode, activeNodes[actualIdx]);
        } else {
            listDisplay.appendChild(newNode); // fallback to end
        }

        // Trigger reflow to start animation
        void newNode.offsetWidth;
        newNode.classList.remove('entering');

        updateIndices(); // Push the +1 index change to trailing nodes visually instantly!

        valInput.value = '';
        idxInput.value = '';
    });

    // Remove (Value)
    document.getElementById('btn-remove').addEventListener('click', () => {
        const val = valInput.value;
        if (val === '') return;

        const idx = listData.findIndex(item => item == val);

        if (idx === -1) {
            log(`ValueError: list.remove(x): x not in list`);
            return;
        }

        const activeNodes = Array.from(listDisplay.children).filter(n => !n.classList.contains('leaving'));
        const targetNode = activeNodes[idx];

        if (targetNode) {
            targetNode.classList.add('leaving');
        }

        log(`list.remove(${val})`);
        listData.splice(idx, 1);

        updateIndices();

        setTimeout(() => {
            if (targetNode && targetNode.parentNode) targetNode.remove();
        }, 400);
    });

    // Sort
    document.getElementById('btn-sort').addEventListener('click', () => {
        listData.sort((a, b) => {
            if (!isNaN(a) && !isNaN(b)) return a - b;
            return String(a).localeCompare(String(b));
        });
        log(`list.sort()`);
        render(); // Sorting is too complex to animate node swaps easily right now, re-render is fine.
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
        // Animate all out
        Array.from(listDisplay.children).forEach(n => n.classList.add('leaving'));
        setTimeout(() => render(), 400);
    });
}

// ==========================================
// MODULE: TRAVERSAL
// ==========================================

function renderTraversal(container) {
    container.innerHTML = `
        <div class="theory-nav" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap;">
            <div style="display:flex; gap:1rem;">
                <button class="btn btn-primary" id="btn-index-trav">1) Index Based</button>
                <button class="btn btn-outline" id="btn-elem-trav" style="border:1px solid var(--primary); color:var(--primary); background:transparent;">2) Element Based</button>
            </div>
            
            <button class="btn btn-accent" id="btn-debug-toggle" style="background:#f39c12; color:#fff; border:none; padding:10px 20px;">🐛 Launch Loop Visualizer</button>
        </div>
        
        <div id="traversal-display" class="fade-in">
            <!-- Content will be injected here -->
        </div>

        <div id="debugger-display" style="display:none; margin-top: 2rem;" class="fade-in">
            <div class="card" style="background:#1e1e2e; color:#cdd6f4; font-family:'Fira Code', monospace; padding: 1.5rem; border: 1px solid #313244;">
                <h3 style="color:#f9e2af; margin-bottom: 1rem; border-bottom: 1px solid #313244; padding-bottom: 0.5rem;">Loop Execution Debugger</h3>
                
                <div style="display:grid; grid-template-columns: 2fr 1fr; gap: 2rem; align-items: stretch;">
                    
                    <!-- Left Column: The List Pointer -->
                    <div style="display:flex; flex-direction:column; justify-content:center;">
                        <div style="margin-bottom: 30px; color:#89b4fa;">List: fruits = ["apple", "banana", "cherry", "date"]</div>
                        <div id="debugger-boxes" style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom: 2rem;">
                            <!-- Boxes generated via JS -->
                        </div>
                        
                        <div style="text-align:center;">
                            <button id="btn-next-step" style="background:#a6e3a1; color:#11111b; font-weight:bold; border:none; padding:12px 24px; border-radius:4px; cursor:pointer;">▶ Next Step</button>
                            <button id="btn-reset-loop" style="background:#f38ba8; color:#11111b; font-weight:bold; border:none; padding:12px 24px; border-radius:4px; cursor:pointer; margin-left: 10px;">🔄 Reset</button>
                        </div>
                    </div>
                    
                    <!-- Right Column: Live Specs Panel -->
                    <div style="background:#181825; padding: 1rem; border-radius: 6px; border: 1px dashed #585b70;">
                        <h4 style="color:#cba6f7; margin-top:0; margin-bottom: 1rem;">Live Specs Panel</h4>
                        
                        <div style="margin-bottom: 0.5rem;">
                            <span style="color:#a6adc8;">Mode:</span> 
                            <strong id="spec-mode" style="color:#f38ba8;">Index-Based</strong>
                        </div>

                        <div style="margin-bottom: 0.5rem;">
                            <span style="color:#a6adc8;">Iteration:</span> 
                            <strong id="spec-iter" style="color:#89b4fa;">Loop 0 of 4</strong>
                        </div>
                        
                        <div style="margin-bottom: 0.5rem;">
                            <span style="color:#a6adc8;">Loop Variable:</span> 
                            <strong id="spec-var" style="color:#f9e2af;">Waiting...</strong>
                        </div>
                        
                        <div style="margin-top: 1.5rem;">
                            <span style="color:#a6adc8;">Current Action:</span> 
                            <div id="spec-action" style="padding: 8px; background:#313244; border-radius: 4px; margin-top: 5px; color:#a6e3a1;">
                                Click Next Step to start the loop.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;

    const display = document.getElementById('traversal-display');
    const debugDisplay = document.getElementById('debugger-display');
    const btnIndex = document.getElementById('btn-index-trav');
    const btnElem = document.getElementById('btn-elem-trav');
    const btnDebug = document.getElementById('btn-debug-toggle');

    const sampleList = ["apple", "banana", "cherry"];
    const listStr = '["apple", "banana", "cherry"]';

    // --- Theory View Generation ---
    const indexContent = `
        <div class="theory-card fade-in">
            <h2>1) Index Based Traversal</h2>
            <p>In index-based traversal, we use a loop and the <code>range(len(list))</code> function to generate index numbers from 0 to length-1. We then access elements using <code>list[i]</code>.</p>
            
            <div class="code-block">
                fruits = ${listStr}<br>
                <span class="keyword">for</span> i <span class="keyword">in</span> <span class="keyword">range</span>(<span class="keyword">len</span>(fruits)):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print(f"Index {i}: {fruits[i]}")
            </div>
            
            <div class="card" style="margin-top: 1.5rem; background: #fafafa;">
                <h3>Execution Output visualization:</h3>
                <div style="font-family: 'Fira Code', monospace; color: #555; margin-top: 0.5rem;">
                    ${sampleList.map((item, i) => `<div>Iteration i=${i}: fruits[${i}] is "${item}"</div>`).join('')}
                </div>
            </div>
        </div>
    `;

    const elemContent = `
        <div class="theory-card fade-in">
            <h2>2) Element Based Traversal</h2>
            <p>In element-based traversal, the loop iterators directly take the value of each element in the list, one by one. This is more Pythonic but doesn't give you the index number directly.</p>
            
            <div class="code-block">
                fruits = ${listStr}<br>
                <span class="keyword">for</span> fruit <span class="keyword">in</span> fruits:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print(f"Element: {fruit}")
            </div>

            <div class="card" style="margin-top: 1.5rem; background: #fafafa;">
                <h3>Execution Output visualization:</h3>
                <div style="font-family: 'Fira Code', monospace; color: #555; margin-top: 0.5rem;">
                    ${sampleList.map((item) => `<div>Iteration: fruit is "${item}"</div>`).join('')}
                </div>
            </div>
        </div>
    `;

    // Default theory view
    display.innerHTML = indexContent;

    // --- State Machine for Debugger ---
    let currentMode = 'index'; // 'index' or 'element'
    let isDebugVisible = false;
    let loopIndex = -1; // -1 means hasn't started
    const debugList = ["apple", "banana", "cherry", "date"];
    const maxIndex = debugList.length;

    // UI Elements for Debugger
    const boxContainer = document.getElementById('debugger-boxes');
    const specMode = document.getElementById('spec-mode');
    const specIter = document.getElementById('spec-iter');
    const specVar = document.getElementById('spec-var');
    const specAction = document.getElementById('spec-action');

    const drawBoxes = () => {
        boxContainer.innerHTML = '';
        debugList.forEach((item, i) => {
            const isProcessed = i < loopIndex;
            const isActive = i === loopIndex;
            const isFirstIteration = loopIndex === 0 && isActive;

            let baseClass = "list-node"; // We can reuse some logic, or keep the custom inline but add glow
            let bgCol = '#313244'; // Unprocessed
            let borderCol = '#45475a';
            let txtCol = '#cdd6f4';
            let extraClass = "";

            if (isProcessed) { bgCol = '#a6e3a1'; borderCol = '#a6e3a1'; txtCol = '#11111b'; }
            if (isActive) {
                extraClass = "active-glow"; // Use our new CSS class instead of manual inline shadow/transform!
                bgCol = '#eef2ff';
                borderCol = '#6366f1';
                txtCol = '#4f46e5';
            }

            const pointVar = currentMode === 'index' ? `i=${i}` : `val="${item}"`;

            // Premium Variable Watcher (Pop Effect) only on the first iteration to explain it, 
            // otherwise just show the pointer normally.
            let headerStr = '';
            if (isActive) {
                if (isFirstIteration) {
                    const explainText = currentMode === 'index' ? `Variable "i" is now looking at index 0` : `Variable "fruit" picked up "apple"`;
                    headerStr = `<div class="variable-watcher">${explainText}</div>`;
                } else {
                    headerStr = `<div style="color:#6366f1; font-weight:bold; position:absolute; top:-35px; left:0; width:100%; text-align:center; white-space:nowrap;">&darr; ${pointVar}</div>`;
                }
            }

            // Notice we removed the inline transform/shadow and rely on extraClass
            boxContainer.innerHTML += `
                <div class="${extraClass}" style="position:relative; margin-top:20px; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); width:80px; height:80px; background:${bgCol}; border:2px solid ${borderCol}; border-radius:8px; display:flex; flex-direction:column; justify-content:center; align-items:center; color:${txtCol};">
                    ${headerStr}
                    <div style="font-size: 0.9em; font-weight:bold;">${item}</div>
                    <div style="font-size: 0.7em; opacity: 0.7;">index ${i}</div>
                </div>
            `;
        });
    };

    const updateSpecs = () => {
        if (loopIndex === -1) {
            specIter.textContent = `Loop 0 of ${maxIndex}`;
            specVar.textContent = "Waiting...";
            specAction.textContent = "Click 'Next Step' to enter the loop.";
            specAction.style.color = "#a6e3a1";
        } else if (loopIndex >= maxIndex) {
            specIter.textContent = "Finished!";
            specVar.textContent = "Loop Exited.";
            specAction.textContent = "Iteration mechanically complete. All items processed.";
            specAction.style.color = "#f38ba8";
        } else {
            specIter.textContent = `Loop ${loopIndex + 1} of ${maxIndex}`;

            if (currentMode === 'index') {
                specVar.textContent = `i = ${loopIndex}`;
                specAction.innerHTML = `1. Generate range sequence: <code>i</code> becomes <strong>${loopIndex}</strong><br>2. Extracting item <code>fruits[${loopIndex}]</code> &rarr; <strong>"${debugList[loopIndex]}"</strong>`;
            } else {
                specVar.textContent = `fruit = "${debugList[loopIndex]}"`;
                specAction.innerHTML = `Directly extracting next sequence item: <code>fruit</code> &rarr; <strong>"${debugList[loopIndex]}"</strong>`;
            }
            specAction.style.color = "#89dceb";
        }
    };

    const runStateUpdate = () => {
        specMode.textContent = currentMode === 'index' ? "Index-Based (range)" : "Element-Based";
        drawBoxes();
        updateSpecs();
    };


    btnIndex.addEventListener('click', () => {
        display.innerHTML = indexContent;
        currentMode = 'index';
        btnIndex.className = 'btn btn-primary'; btnIndex.style = '';
        btnElem.className = 'btn btn-outline'; btnElem.style = 'border:1px solid var(--primary); color:var(--primary); background:transparent;';
        if (isDebugVisible) runStateUpdate();
    });

    btnElem.addEventListener('click', () => {
        display.innerHTML = elemContent;
        currentMode = 'element';
        btnElem.className = 'btn btn-primary'; btnElem.style = '';
        btnIndex.className = 'btn btn-outline'; btnIndex.style = 'border:1px solid var(--primary); color:var(--primary); background:transparent;';
        if (isDebugVisible) runStateUpdate();
    });

    btnDebug.addEventListener('click', () => {
        isDebugVisible = !isDebugVisible;
        if (isDebugVisible) {
            debugDisplay.style.display = 'block';
            btnDebug.textContent = "📖 Hide Visualizer";
            btnDebug.style.background = "#f38ba8"; // Redish text to close
            loopIndex = -1; // Reset on open
            runStateUpdate();
            // Scroll to visualizer
            debugDisplay.scrollIntoView({ behavior: 'smooth' });
        } else {
            debugDisplay.style.display = 'none';
            btnDebug.textContent = "🐛 Launch Loop Visualizer";
            btnDebug.style.background = "#f39c12"; // Yellow
        }
    });

    document.getElementById('btn-next-step').addEventListener('click', () => {
        if (loopIndex < maxIndex) {
            loopIndex++;
            runStateUpdate();
        }
    });

    document.getElementById('btn-reset-loop').addEventListener('click', () => {
        loopIndex = -1;
        runStateUpdate();
    });
}

// ==========================================
// MODULE: QUIZ
// ==========================================

async function renderQuiz(container) {
    container.innerHTML = '<div class="card fade-in" style="text-align: center; padding: 3rem;"><h2>Loading Quiz... ⏳</h2></div>';

    try {
        // Fetch the 50 questions from python injected window object
        if (!window.QUIZ_DATA) throw new Error("Questions data not found in window object.");

        // window.QUIZ_DATA is already a Javascript array of objects, no need to JSON.parse it if we use it directly!
        const allQuestions = window.QUIZ_DATA;

        // Shuffle all questions and pick 5 random ones
        const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);

        // Deep copy safely 
        const currentQuizData = JSON.parse(JSON.stringify(shuffledQuestions));

        // Shuffle the options within each question
        currentQuizData.forEach(q => {
            const originalAnswerText = q.options[q.answer];

            // Fisher-Yates shuffle for options
            for (let i = q.options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
            }

            // Update answer index to reflect shuffled options
            q.answer = q.options.indexOf(originalAnswerText);
        });

        // Build HTML
        let quizHtml = '<div class="card fade-in"><h2>Python Lists Quiz (5 Random Questions)</h2><div class="quiz-container">';

        currentQuizData.forEach((q, index) => {
            quizHtml += `
                <div class="quiz-question" style="margin-bottom: 2rem;">
                    <p style="font-size: 1.1rem; margin-bottom: 0.8rem;"><strong>${index + 1}. ${q.question}</strong></p>
                    <div class="options" style="display: flex; flex-direction: column; gap: 0.5rem;">
                        ${q.options.map((opt, i) => `
                            <label style="cursor: pointer; padding: 0.8rem; border: 1px solid #e2e8f0; border-radius: 8px; display: block; transition: all 0.2s ease;">
                                <input type="radio" name="q${index}" value="${i}" style="margin-right: 0.5rem;"> 
                                <span style="font-family: monospace; font-size: 1.05rem;">${opt}</span>
                            </label>
                        `).join('')}
                    </div>
                    <div id="feedback-${index}" style="margin-top: 0.5rem; font-weight: 500;"></div>
                </div>
            `;
        });

        quizHtml += `
                <button class="btn btn-primary" id="btn-submit-quiz" style="margin-top: 1rem; width: 100%; padding: 1rem; font-size: 1.1rem;">Submit Answers</button>
                <div id="quiz-result" style="margin-top: 1.5rem; font-size: 1.5rem; font-weight: bold; text-align: center; color: var(--primary);"></div>
                <button class="btn btn-outline" id="btn-retry-quiz" style="margin-top: 1rem; width: 100%; padding: 1rem; font-size: 1.1rem; display: none;">Take Another Quiz</button>
            </div>
        </div>`;

        container.innerHTML = quizHtml;

        // Add interactivity to options for styling
        const labels = container.querySelectorAll('.options label');
        labels.forEach(label => {
            label.addEventListener('click', function () {
                const group = this.closest('.options');
                group.querySelectorAll('label').forEach(l => {
                    l.style.background = 'transparent';
                    l.style.borderColor = '#e2e8f0';
                });
                this.style.background = 'rgba(108, 92, 231, 0.05)';
                this.style.borderColor = 'var(--primary)';
            });
        });

        document.getElementById('btn-submit-quiz').addEventListener('click', () => {
            let score = 0;
            currentQuizData.forEach((q, index) => {
                const selectedMatch = container.querySelector(`input[name="q${index}"]:checked`);
                const feedbackEl = document.getElementById(`feedback-${index}`);
                const optionsGroup = feedbackEl.previousElementSibling;

                // Disable inputs after submit
                optionsGroup.querySelectorAll('input').forEach(input => input.disabled = true);

                if (selectedMatch) {
                    const selectedAns = parseInt(selectedMatch.value);
                    if (selectedAns === q.answer) {
                        score++;
                        feedbackEl.textContent = "✅ Correct!";
                        feedbackEl.style.color = "#10b981";
                        selectedMatch.closest('label').style.background = 'rgba(16, 185, 129, 0.1)';
                        selectedMatch.closest('label').style.borderColor = '#10b981';
                    } else {
                        feedbackEl.innerHTML = `❌ Incorrect.The correct answer is: <span style="font-family: monospace;">${q.options[q.answer]}</span>`;
                        feedbackEl.style.color = "#ef4444";
                        selectedMatch.closest('label').style.background = 'rgba(239, 68, 68, 0.1)';
                        selectedMatch.closest('label').style.borderColor = '#ef4444';
                    }
                } else {
                    feedbackEl.innerHTML = `⚠️ No answer selected.The correct answer is: <span style="font-family: monospace;">${q.options[q.answer]}</span>`;
                    feedbackEl.style.color = "#f59e0b";
                }
            });

            const resultEl = document.getElementById('quiz-result');
            const percentage = Math.round((score / currentQuizData.length) * 100);

            let message = "";
            if (percentage === 100) message = "Perfect! 🏆";
            else if (percentage >= 80) message = "Great job! 🌟";
            else if (percentage >= 60) message = "Good effort! 👍";
            else message = "Keep reviewing the Theory section! 📚";

            resultEl.innerHTML = `You scored ${score} out of ${currentQuizData.length} (${percentage}%) <br><span style="font-size: 1.2rem; color: #64748b; margin-top: 0.5rem; display: block;">${message}</span>`;

            // Swap buttons
            const submitBtn = document.getElementById('btn-submit-quiz');
            submitBtn.style.display = 'none';

            const retryBtn = document.getElementById('btn-retry-quiz');
            retryBtn.style.display = 'block';
            retryBtn.addEventListener('click', () => renderQuiz(container)); // Reload quiz

            container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        });

    } catch (error) {
        container.innerHTML = `<div class="card fade-in"><h2 style="color: red;">Error</h2><p>${error.message}</p></div>`;
    }
}

// ==========================================
// MODULE: SLICING
// ==========================================

function renderSlicing(container) {
    container.innerHTML = `
        <div class="card fade-in" style="background:var(--card-bg); border-radius:12px; padding:2rem; box-shadow:var(--shadow);">
            
            <div style="display:flex; justify-content:space-between; align-items:flex-end; border-bottom:1px solid #e2e8f0; padding-bottom:1rem; margin-bottom:2rem;">
                <div>
                    <h2 style="color:var(--primary); margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem;"><span style="font-size:1.5rem;">✂️</span> Slicing Workbench</h2>
                    <p style="color:#64748b; margin:0;">Visualizing Python's <code>list[start:stop:step]</code> syntax.</p>
                </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 2fr; gap:2rem; align-items:start;">
                
                <!-- Controls Panel -->
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:1.5rem;">
                    <h3 style="font-size:1.1rem; color:#334155; margin-top:0; margin-bottom:1.5rem;">Slice Parameters</h3>
                    
                    <div style="margin-bottom:1.5rem;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                            <label style="font-family:monospace; font-weight:bold; color:var(--primary);">start:</label>
                            <span id="val-start" style="color:#64748b; font-family:monospace;">(default: 0)</span>
                        </div>
                        <input type="range" id="slider-start" min="-7" max="7" value="none" class="slice-slider" style="width:100%;">
                        <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:#94a3b8; margin-top:0.2rem;">
                            <span>-7</span><span>0</span><span>7</span>
                        </div>
                    </div>

                    <div style="margin-bottom:1.5rem;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                            <label style="font-family:monospace; font-weight:bold; color:var(--primary);">stop:</label>
                            <span id="val-stop" style="color:#64748b; font-family:monospace;">(default: end)</span>
                        </div>
                        <input type="range" id="slider-stop" min="-7" max="7" value="none" class="slice-slider" style="width:100%;">
                        <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:#94a3b8; margin-top:0.2rem;">
                            <span>-7</span><span>0</span><span>7</span>
                        </div>
                    </div>

                    <div style="margin-bottom:1.5rem;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                            <label style="font-family:monospace; font-weight:bold; color:var(--primary);">step:</label>
                            <span id="val-step" style="color:#64748b; font-family:monospace;">1</span>
                        </div>
                        <input type="range" id="slider-step" min="-3" max="3" value="1" class="slice-slider" style="width:100%;">
                        <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:#94a3b8; margin-top:0.2rem;">
                            <span>-3</span><span>0 (invalid)</span><span>3</span>
                        </div>
                    </div>
                    
                    <button id="btn-reset-slice" class="btn btn-outline" style="width:100%;">Reset to Defaults</button>
                </div>

                <!-- Visualization Panel -->
                <div style="display:flex; flex-direction:column;">
                    
                    <!-- Live Formula (Dual-Pane Live Code Card) -->
                    <div class="live-code-card">
                        <div style="color:#89b4fa; margin-bottom:1rem; font-family:'Fira Code', monospace; font-size:1.1rem; border-bottom:1px solid #313244; padding-bottom:0.5rem;">my_list = ["A", "B", "C", "D", "E", "F", "G"]</div>
                        <div class="code-display">
                            re_list = my_list[<span id="code-start" style="color:#f38ba8; margin:0 2px;"></span>:<span id="code-stop" style="color:#a6e3a1; margin:0 2px;"></span>:<span id="code-step" style="color:#f9e2af; margin:0 2px;">1</span>]
                        </div>
                        <div style="font-size:0.85rem; color:#a6adc8; display:flex; justify-content:space-between; margin-top:0.5rem;">
                            <span><span style="display:inline-block; width:10px; height:10px; background:#f38ba8; border-radius:50%; margin-right:5px;"></span>Start Point</span>
                            <span><span style="display:inline-block; width:10px; height:10px; background:#a6e3a1; border-radius:50%; margin-right:5px;"></span>Stop Limit</span>
                            <span><span style="display:inline-block; width:10px; height:10px; background:#f9e2af; border-radius:50%; margin-right:5px;"></span>Step Size</span>
                        </div>
                    </div>

                    <!-- The List Boxes -->
                    <div id="slice-boxes" style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:2rem; margin-bottom:3rem;">
                        <!-- Generated by JS -->
                    </div>

                    <!-- Result Preview -->
                    <div style="margin-top:auto; background:#f1f5f9; padding:1rem; border-radius:6px; border:1px solid #cbd5e1;">
                        <h4 style="margin:0 0 0.5rem 0; color:#475569; font-size:0.9rem; text-transform:uppercase;">Resulting List</h4>
                        <div id="slice-result" style="font-family:'Fira Code', monospace; font-size:1.1rem; color:var(--primary); font-weight:bold;">
                            ["A", "B", "C", "D", "E", "F", "G"]
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const sampleList = ["A", "B", "C", "D", "E", "F", "G"];
    const len = sampleList.length;

    // UI Elements
    const sliderStart = document.getElementById('slider-start');
    const sliderStop = document.getElementById('slider-stop');
    const sliderStep = document.getElementById('slider-step');

    const valStart = document.getElementById('val-start');
    const valStop = document.getElementById('val-stop');
    const valStep = document.getElementById('val-step');

    const codeStart = document.getElementById('code-start');
    const codeStop = document.getElementById('code-stop');
    const codeStep = document.getElementById('code-step');

    const boxContainer = document.getElementById('slice-boxes');
    const resultBox = document.getElementById('slice-result');

    // State Variables (null implies default)
    let startConfig = null;
    let stopConfig = null;
    let stepConfig = 1;

    // Helper: Normalize start/stop string from slider (handling "none")
    function parseSliderVal(valStr) {
        if (!valStr || valStr === "none" || valStr === "") return null;
        return parseInt(valStr);
    }

    // Python Slice Logic Implementation
    // Resolving negative or omitted indices to actual 0-based bounds based on Python rules.
    function resolveBounds(start, stop, step, length) {
        let actualStart, actualStop;

        if (step > 0) {
            // Default bounds for positive step
            actualStart = start === null ? 0 : (start < 0 ? start + length : start);
            actualStop = stop === null ? length : (stop < 0 ? stop + length : stop);

            // Constrain
            actualStart = Math.max(0, Math.min(actualStart, length));
            actualStop = Math.max(0, Math.min(actualStop, length));
        } else if (step < 0) {
            // Default bounds for negative step
            actualStart = start === null ? length - 1 : (start < 0 ? start + length : start);
            actualStop = stop === null ? -1 : (stop < 0 ? stop + length : stop);

            // Constrain (start can be length-1 down to 0, stop can be length-2 down to -1)
            actualStart = Math.min(length - 1, Math.max(actualStart, -1));
            actualStop = Math.min(length - 1, Math.max(actualStop, -1));
        } else {
            // Step = 0 is invalid
            return [];
        }

        // Generate the indices included in the slice
        let includedIndices = [];
        if (step > 0) {
            for (let i = actualStart; i < actualStop; i += step) {
                includedIndices.push(i);
            }
        } else {
            for (let i = actualStart; i > actualStop; i += step) {
                includedIndices.push(i);
            }
        }
        return includedIndices;
    }

    const updateSlicer = () => {
        // Handle step = 0 (snap to 1)
        if (stepConfig === 0) {
            stepConfig = 1;
            sliderStep.value = 1;
        }

        // Update Labels
        valStart.textContent = startConfig === null ? "(default)" : startConfig;
        codeStart.textContent = startConfig === null ? "" : startConfig;

        valStop.textContent = stopConfig === null ? "(default)" : stopConfig;
        codeStop.textContent = stopConfig === null ? "" : stopConfig;

        valStep.textContent = stepConfig;
        codeStep.textContent = stepConfig;

        // Hide trailing colons if default
        if (stepConfig === 1 && stopConfig === null) {
            codeStep.previousSibling.textContent = "";
            codeStep.textContent = "";
        } else {
            codeStep.previousSibling.textContent = ":";
        }

        // Calculate active indices
        const activeIndices = resolveBounds(startConfig, stopConfig, stepConfig, len);

        // Draw Boxes
        boxContainer.innerHTML = '';
        sampleList.forEach((item, posIndex) => {
            const negIndex = posIndex - len;
            const isIncluded = activeIndices.includes(posIndex);

            // Find if it was "skipped" inside bounds
            // A skipped box is between the min and max of active indices, but not in the array
            let isSkipped = false;
            if (activeIndices.length > 0 && !isIncluded) {
                const minActive = Math.min(...activeIndices);
                const maxActive = Math.max(...activeIndices);
                if (posIndex > minActive && posIndex < maxActive) {
                    isSkipped = true;
                }
            }

            // Styling
            let bgCol = '#ffffff';
            let borderCol = '#cbd5e1';
            let txtCol = '#475569';
            let opacity = '0.4'; // Dim
            let transform = 'scale(0.95)';
            let filter = 'grayscale(100%)';

            if (isIncluded) {
                bgCol = 'rgba(56, 189, 248, 0.1)'; // Bright blue tint
                borderCol = '#0284c7';
                txtCol = '#0f172a';
                opacity = '1';
                transform = 'scale(1.05)';
                filter = 'none';

                // Show sequence order if step is backwards or >1
                const orderText = activeIndices.indexOf(posIndex) + 1;
                var orderBadge = `<div style="position:absolute; top:-10px; right:-10px; background:#f59e0b; color:#fff; width:20px; height:20px; border-radius:10px; font-size:0.75rem; font-weight:bold; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 4px rgba(0,0,0,0.2);">${orderText}</div>`;
            } else {
                var orderBadge = '';
            }

            if (isSkipped) {
                bgCol = '#f1f5f9'; // Gray indicator
                txtCol = '#94a3b8';
                borderCol = '#e2e8f0';
                opacity = '0.6';
            }

            boxContainer.innerHTML += `
                <div style="display:flex; flex-direction:column; align-items:center; opacity:${opacity}; transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1); filter:${filter};">
                    <div style="font-family:monospace; color:#8b5cf6; font-weight:bold; margin-bottom:5px; font-size:0.9rem;">${posIndex}</div>
                    <div style="position:relative; width:60px; height:60px; background:${bgCol}; border:2px solid ${borderCol}; border-radius:8px; display:flex; justify-content:center; align-items:center; font-size:1.5rem; font-family:'Fira Code', monospace; font-weight:bold; color:${txtCol}; transform:${transform}; box-shadow: ${isIncluded ? '0 4px 6px rgba(14, 165, 233, 0.2)' : 'none'};">
                        ${item}
                        ${orderBadge}
                    </div>
                    <div style="font-family:monospace; color:#f43f5e; margin-top:5px; font-size:0.85rem;">${negIndex}</div>
                </div>
            `;
        });

        // Update Result Code
        if (activeIndices.length === 0) {
            resultBox.textContent = "[] (Empty List)";
            resultBox.style.color = "#94a3b8";
        } else {
            const resultItems = activeIndices.map(i => `"${sampleList[i]}"`);
            resultBox.textContent = `[${resultItems.join(", ")}]`;
            resultBox.style.color = "var(--primary)";
        }
    };

    // Event Listeners for Sliders
    // Double click to reset a specific slider
    sliderStart.addEventListener('dblclick', (e) => { e.target.value = "none"; startConfig = null; updateSlicer(); });
    sliderStop.addEventListener('dblclick', (e) => { e.target.value = "none"; stopConfig = null; updateSlicer(); });
    sliderStep.addEventListener('dblclick', (e) => { e.target.value = 1; stepConfig = 1; updateSlicer(); });

    sliderStart.addEventListener('input', (e) => {
        // Special logic: Slider center (0) can be dragged below 0 to negative, or above. 
        // HTML slider has no 'none', so we treat min value (-8) as 'none' visually for UX, 
        // but it's cleaner to just use buttons or let users slide.
        // For simplicity: If user slides to extreme min (-7), we'll let it be -7.
        startConfig = parseInt(e.target.value);
        updateSlicer();
    });

    sliderStop.addEventListener('input', (e) => {
        stopConfig = parseInt(e.target.value);
        updateSlicer();
    });

    sliderStep.addEventListener('input', (e) => {
        stepConfig = parseInt(e.target.value);
        updateSlicer();
    });

    document.getElementById('btn-reset-slice').addEventListener('click', () => {
        startConfig = null; sliderStart.value = 0; // Visually resets to middle but logic is null
        stopConfig = null; sliderStop.value = 0;
        stepConfig = 1; sliderStep.value = 1;
        updateSlicer();
    });

    // Initial render
    updateSlicer();
}

// ==========================================
// 6. PROGRAMMING MODULE
// ==========================================

const programmingData = [
    {
        id: 1,
        title: '1. The "Sum & Average" Calculator',
        level: 'Basic (Building blocks)',
        task: 'Input $n$ numbers from the user into a list and find their total sum and average without using the sum() function.',
        skill: 'Using for loops and append().',
        code: `n = int(input("Enter how many numbers: "))
num_list = []

for i in range(n):
    val = float(input(f"Enter number {i+1}: "))
    num_list.append(val)

total_sum = 0
for num in num_list:
    total_sum += num

average = total_sum / n
print(f"List: {num_list}")
print(f"Sum: {total_sum}, Average: {average}")`,
        explanation: `<div class="explanation-box">
            <h4>🧠 What is happening here?</h4>
            <ol>
                <li>We create an empty list <code>num_list = []</code>.</li>
                <li>We use a <code>for i in range(n)</code> loop to ask the user for a number <code>n</code> times.</li>
                <li>Inside the loop, <code>num_list.append(val)</code> physically attaches each new number to the end of our growing list.</li>
                <li>To find the sum, we initialize an accumulator <code>total_sum = 0</code>.</li>
                <li>We iterate through each <code>num</code> in the list, adding it to <code>total_sum</code>.</li>
                <li>Finally, we divide the sum by <code>n</code> to find the average.</li>
            </ol>
        </div>`
    },
    {
        id: 2,
        title: '2. List Swapper',
        level: 'Basic (Building blocks)',
        task: "Write a program to swap the first and last elements of a list, regardless of the list's length.",
        skill: 'Indexing (0 and -1) and variable assignment.',
        code: `my_list = [10, 20, 30, 40, 50]
print(f"Original: {my_list}")

# Storing the first element temporarily
temp = my_list[0]

# Overwriting the first element with the last element
my_list[0] = my_list[-1]

# Overwriting the last element with the temporarily stored first element
my_list[-1] = temp

print(f"Swapped: {my_list}")`,
        explanation: `<div class="explanation-box">
            <h4>🧠 What is happening here?</h4>
            <ol>
                <li>We target the <strong>first element</strong> using index <code>[0]</code>.</li>
                <li>We target the <strong>last element</strong> safely using index <code>[-1]</code>, which always works regardless of the list's size.</li>
                <li>If we just say <code>my_list[0] = my_list[-1]</code>, we lose the original first element!</li>
                <li>So, we must first store <code>my_list[0]</code> in a <code>temp</code> variable.</li>
                <li>Then, we can safely overwrite index 0 with the value from index -1.</li>
                <li>Finally, we put the <code>temp</code> value into index -1.</li>
            </ol>
            <div style="background:var(--bg-card); padding:10px; border-radius:6px; margin-top:10px;">
                💡 <em>Pythonic shortcut:</em> <code>my_list[0], my_list[-1] = my_list[-1], my_list[0]</code> does this in one line without a temp variable!
            </div>
        </div>`
    },
    {
        id: 3,
        title: '3. The "Even-Odd" Splitter',
        level: 'Basic (Building blocks)',
        task: 'Take a list of 10 numbers and create two separate lists: one containing only even numbers and the other only odd.',
        skill: 'Using the Modulo operator (%) and if-else logic.',
        code: `numbers = [12, 7, 34, 23, 89, 44, 10, 3, 5, 8]
evens = []
odds = []

for num in numbers:
    if num % 2 == 0:
        evens.append(num)
    else:
        odds.append(num)

print(f"Original: {numbers}")
print(f"Evens: {evens}")
print(f"Odds: {odds}")`,
        explanation: `<div class="explanation-box">
            <h4>🧠 What is happening here?</h4>
            <ol>
                <li>We prepare two empty baskets: <code>evens = []</code> and <code>odds = []</code>.</li>
                <li>We pick up each number one by one using a <code>for</code> loop.</li>
                <li>We check if the number is even using the Modulo operator: <code>num % 2 == 0</code>. This asks "Is the remainder perfectly 0 when divided by 2?"</li>
                <li>If True (even), we <code>append()</code> it to the <code>evens</code> list.</li>
                <li>If False (odd), it falls into the <code>else</code> block, and we <code>append()</code> it to the <code>odds</code> list.</li>
            </ol>
        </div>`
    },
    {
        id: 4,
        title: '4. The "Max-Min" Finder (The Manual Way)',
        level: 'Medium (Logic & Analysis)',
        task: 'Find the largest and smallest number in a list without using max() or min().',
        skill: 'Comparison logic (Initializing a variable to list[0] and iterating).',
        code: `data = [45, 12, 89, 33, 7, 99, 21]

# Assume the first element is both the max and min initially
maximum = data[0]
minimum = data[0]

for num in data:
    if num > maximum:
        maximum = num
    if num < minimum:
        minimum = num

print(f"List: {data}")
print(f"Maximum value: {maximum}")
print(f"Minimum value: {minimum}")`,
        explanation: `<div class="explanation-box">
            <h4>🧠 What is happening here?</h4>
            <ol>
                <li>We must set a baseline. We cannot initialize our max/min to 0 because if the list contains only negative numbers, 0 would incorrectly be the maximum!</li>
                <li>Instead, we assume the very first element <code>data[0]</code> is both the current champion (maximum) and current loser (minimum).</li>
                <li>We iterate through the rest of the list.</li>
                <li>If we find a number <code>&gt; maximum</code>, we crown a new maximum champion.</li>
                <li>If we find a number <code>&lt; minimum</code>, we set a new minimum.</li>
            </ol>
        </div>`
    },
    {
        id: 5,
        title: '5. Element Searcher (Linear Search)',
        level: 'Medium (Logic & Analysis)',
        task: 'Ask the user for a number to search for. If it’s in the list, print its index; otherwise, print "Not Found."',
        skill: 'Membership operators (in) and the index() method.',
        code: `inventory = [101, 205, 309, 415, 502, 688]
print(f"Current Inventory IDs: {inventory}")

target = int(input("Enter ID to search for: "))

if target in inventory:
    pos = inventory.index(target)
    print(f"Found! Item {target} is at index {pos}.")
else:
    print("Not Found.")`,
        explanation: `<div class="explanation-box">
            <h4>🧠 What is happening here?</h4>
            <ol>
                <li>We use the magical <code>in</code> operator. <code>target in inventory</code> scans the entire list internally and returns <code>True</code> if the item exists, preventing errors.</li>
                <li>If it exists, we are safe to call <code>inventory.index(target)</code>, which scans from left-to-right and stops at the <strong>first occurrence</strong> of the target, returning its position (index).</li>
                <li>If <code>in</code> returned <code>False</code>, the <code>else</code> block gracefully prints "Not Found" without crashing the program.</li>
            </ol>
        </div>`
    },
    {
        id: 6,
        title: '6. Remove Duplicates',
        level: 'Medium (Logic & Analysis)',
        task: 'Given a list with repeating numbers, create a new list that contains each number only once.',
        skill: 'Creating a "Result" list and checking if an item already exists before appending.',
        code: `raw_data = [1, 2, 2, 3, 4, 4, 1, 5, 2]
clean_data = []

for item in raw_data:
    if item not in clean_data:
        clean_data.append(item)

print(f"Raw Data: {raw_data}")
print(f"Clean Data (No Duplicates): {clean_data}")`,
        explanation: `<div class="explanation-box">
            <h4>🧠 What is happening here?</h4>
            <ol>
                <li>We start with an empty <code>clean_data</code> list that acts as our filter.</li>
                <li>We look at every <code>item</code> in the <code>raw_data</code>.</li>
                <li>The crucial step is the condition: <code>if item not in clean_data</code>. We are asking our filter basket: "Do you already have this item?"</li>
                <li>Only if the answer is <em>No</em> (it's essentially a new, unseen item), do we <code>append()</code> it.</li>
                <li>This guarantees that the <code>clean_data</code> list will never contain duplicates, preserving the original order of appearance!</li>
            </ol>
        </div>`
    },
    {
        id: 7,
        title: '7. List Reversal (In-place)',
        level: 'Medium (Logic & Analysis)',
        task: 'Reverse the order of a list without using the .reverse() method or [::-1] slicing.',
        skill: 'Using a for loop to swap elements from the front and back.',
        code: `elements = ['A', 'B', 'C', 'D', 'E']
print(f"Original: {elements}")

n = len(elements)
# We only need to loop halfway!
for i in range(n // 2):
    # Swap elements at index i and (n - 1 - i)
    temp = elements[i]
    elements[i] = elements[n - 1 - i]
    elements[n - 1 - i] = temp

print(f"Reversed: {elements}")`,
        explanation: `<div class="explanation-box">
            <h4>🧠 What is happening here?</h4>
            <ol>
                <li>Imagine two pointers: one starting at the very front (index 0) and one at the very back (index <code>n-1</code>).</li>
                <li>We swap the elements they are pointing at.</li>
                <li>Then, we move the front pointer one step forward, and the back pointer one step backward (index <code>n - 1 - i</code>).</li>
                <li><strong>Crucial insight:</strong> We only loop exactly halfway (<code>n // 2</code>). If we looped the whole length, we would reverse the list, and then accidentally reverse it back to normal!</li>
                <li>For an odd-length list (e.g., length 5), the middle element (index 2) stays exactly where it is.</li>
            </ol>
        </div>`
    },
    {
        id: 8,
        title: '8. Frequency Counter',
        level: 'Advanced (Combining Concepts)',
        task: 'For a given list of items, count how many times each item appears and display it.',
        skill: 'Iterating over unique items and using count().',
        code: `inventory = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
checked = [] # To keep track of items we've already counted

print(f"Inventory List: {inventory}\n")

for fruit in inventory:
    if fruit not in checked:
        count = inventory.count(fruit)
        print(f"{fruit}: {count}")
        checked.append(fruit) # Mark as counted!`,
        explanation: `<div class="explanation-box">
            <h4>🧠 What is happening here?</h4>
            <ol>
                <li>We want to output the count of each fruit, but we don't want to print "apple: 3" three separate times!</li>
                <li>Therefore, we maintain an auxiliary list called <code>checked</code>.</li>
                <li>For each fruit in the inventory, we first ask: "Have we already calculated and printed the count for this fruit?" (<code>if fruit not in checked</code>)</li>
                <li>If not, we calculate its frequency using <code>inventory.count(fruit)</code> and print it.</li>
                <li>Immediately after, we add it to the <code>checked</code> list so we ignore it the next time the loop encounters it.</li>
            </ol>
        </div>`
    },
    {
        id: 9,
        title: '9. The "Circular Shift"',
        level: 'Advanced (Combining Concepts)',
        task: 'Shift all elements of a list to the left by one position. The first element should move to the very end.',
        skill: 'Combining pop(0) and append().',
        code: `queue = [10, 20, 30, 40, 50]
print(f"Initial State: {queue}")

# 1. Remove the first element (index 0)
first_element = queue.pop(0)

# 2. Append it to the end
queue.append(first_element)

print(f"After Left Shift: {queue}")`,
        explanation: `<div class="explanation-box">
            <h4>🧠 What is happening here?</h4>
            <ol>
                <li>We have a line representing a <code>queue</code>. We want the person at the front (index 0) to move to the back of the line, shifting everyone else forward.</li>
                <li>We use <code>queue.pop(0)</code>. This powerful method does two things at once: it deletes the element at index 0 from the list, causing all other elements to instantly slide left to fill the gap, AND it returns that deleted value to us, which we save as <code>first_element</code>.</li>
                <li>Now that the gap is closed, we simply use <code>queue.append(first_element)</code> to stick that saved value at the very end of the list.</li>
            </ol>
        </div>`
    },
    {
        id: 10,
        title: '10. List of Lists (Nested Student Record)',
        level: 'Advanced (Combining Concepts)',
        task: 'Create a list of students [RollNo, Name, Marks]. Allow searching for a student by Roll Number.',
        skill: 'Nested list indexing (list[i][j]).',
        code: `# A list where each element is itself a list [RollNo, Name, Marks]
database = [
    [101, "Alice", 85.5],
    [102, "Bob", 92.0],
    [103, "Charlie", 78.0]
]

search_roll = int(input("Enter Roll No to find: "))
found = False

for student in database:
    # student is a sub-list, e.g., [101, "Alice", 85.5]
    if student[0] == search_roll: 
        print(f"Student Found! Name: {student[1]}, Marks: {student[2]}")
        found = True
        break # Stop searching

if not found:
    print("No student exists with that Roll Number.")`,
        explanation: `<div class="explanation-box">
            <h4>🧠 What is happening here?</h4>
            <ol>
                <li>We create a 2-Dimensional structure: a list of lists.</li>
                <li>When we iterate <code>for student in database:</code>, the variable <code>student</code> represents an entire inner list (e.g., <code>[101, "Alice", 85.5]</code>) on each loop.</li>
                <li>Because <code>student</code> is a list, we can access its internal elements using indexes: <code>student[0]</code> is the Roll Number, <code>student[1]</code> is the Name.</li>
                <li>We check if <code>student[0]</code> matches the user's search. If it does, we print their data, set our flag <code>found = True</code>, and immediately <code>break</code> the loop to save processing time.</li>
            </ol>
        </div>`
    }
];

function renderProgramming(container) {
    container.innerHTML = `
        <div class="program-layout" style="display: flex; gap: 2rem; align-items: flex-start;">
            <!-- Left Side: List of Programs -->
            <div class="program-sidebar" style="flex: 0 0 320px; background: #fff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); padding: 1rem; position: sticky; top: 1rem;">
                <h3 style="color: var(--primary); margin-bottom: 1rem; border-bottom: 2px solid var(--border); padding-bottom: 0.5rem;">Program Library</h3>
                
                <div class="program-level-group">
                    <h4 style="color: var(--text-dark); margin: 1rem 0 0.5rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Level 1: Basic</h4>
                    <ul class="program-list" id="prog-list-basic" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.25rem;"></ul>
                </div>

                <div class="program-level-group">
                    <h4 style="color: var(--text-dark); margin: 1.5rem 0 0.5rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Level 2: Medium</h4>
                    <ul class="program-list" id="prog-list-medium" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.25rem;"></ul>
                </div>

                <div class="program-level-group">
                    <h4 style="color: var(--text-dark); margin: 1.5rem 0 0.5rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Level 3: Advanced</h4>
                    <ul class="program-list" id="prog-list-advanced" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.25rem;"></ul>
                </div>
            </div>

            <!-- Right Side: Program Details -->
            <div class="program-details" id="program-display" style="flex: 1; background: #fff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); padding: 2rem; min-height: 600px;">
                <div style="text-align: center; color: var(--text-muted); margin-top: 100px;">
                    <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">💻</span>
                    <h2>Select a program from the library</h2>
                    <p>Choose any program from the left menu to view its task, solution, and visual explanation.</p>
                </div>
            </div>
        </div>
    `;

    const listBasic = document.getElementById('prog-list-basic');
    const listMedium = document.getElementById('prog-list-medium');
    const listAdvanced = document.getElementById('prog-list-advanced');
    const displayArea = document.getElementById('program-display');

    // Function to render details
    const showProgramDetails = (prog) => {
        // Update active state on sidebar
        document.querySelectorAll('.program-list li').forEach(li => li.style.background = 'transparent');
        document.querySelectorAll('.program-list li').forEach(li => li.style.color = 'var(--text-dark)');
        document.querySelectorAll('.program-list li').forEach(li => li.style.fontWeight = 'normal');

        const activeItem = document.getElementById(`prog-item-${prog.id}`);
        if (activeItem) {
            activeItem.style.background = 'var(--bg-card)';
            activeItem.style.color = 'var(--primary)';
            activeItem.style.fontWeight = '600';
            activeItem.style.borderRadius = '6px';
        }

        displayArea.innerHTML = `
            <h2 style="color: var(--primary); margin-bottom: 0.5rem; font-size: 1.8rem;">${prog.title}</h2>
            <div style="display: inline-block; background: var(--bg-card); color: var(--accent); padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold; margin-bottom: 2rem;">
                ${prog.level}
            </div>

            <div style="background: #f8fafc; border-left: 4px solid var(--accent); padding: 1.5rem; margin-bottom: 2rem; border-radius: 0 8px 8px 0;">
                <h4 style="margin-bottom: 0.5rem; color: #334155;">📋 The Task</h4>
                <p style="font-size: 1.05rem; line-height: 1.6; color: #475569; margin-bottom: 1rem;">${prog.task}</p>
                <div style="font-size: 0.9rem; color: #64748b;"><strong>Target Skill:</strong> ${prog.skill}</div>
            </div>

            <h3 style="margin-bottom: 1rem; color: var(--text-dark); display: flex; align-items: center; gap: 0.5rem;">
                <span>🐍</span> Python Solution
            </h3>
            <div class="live-code-card" style="margin-bottom: 2rem; background: #1e1e2e; padding: 0; overflow: hidden;">
                <div style="background: #11111b; padding: 8px 16px; border-bottom: 1px solid #313244; display: flex; gap: 6px;">
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: #f38ba8;"></div>
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: #f9e2af;"></div>
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: #a6e3a1;"></div>
                </div>
                <pre style="margin: 0; padding: 1.5rem; overflow-x: auto;"><code style="font-family: 'Fira Code', monospace; color: #cdd6f4; line-height: 1.5;">${prog.code}</code></pre>
            </div>

            ${prog.explanation}
        `;

        // Ensure explanation box gets styles injectively
        const explanationBox = displayArea.querySelector('.explanation-box');
        if (explanationBox) {
            explanationBox.style.background = '#fff';
            explanationBox.style.border = '1px solid #e2e8f0';
            explanationBox.style.borderRadius = '12px';
            explanationBox.style.padding = '1.5rem';
            explanationBox.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';

            const listItems = explanationBox.querySelectorAll('ol li');
            listItems.forEach(li => {
                li.style.marginBottom = '0.75rem';
                li.style.lineHeight = '1.5';
                li.style.color = '#334155';
            });
            const inlineCodes = explanationBox.querySelectorAll('code');
            inlineCodes.forEach(c => {
                c.style.background = '#f1f5f9';
                c.style.padding = '2px 6px';
                c.style.borderRadius = '4px';
                c.style.color = 'var(--primary)';
                c.style.fontFamily = "'Fira Code', monospace";
                c.style.fontSize = '0.9em';
            });
        }
    };

    // Populate sidebar
    programmingData.forEach(prog => {
        const li = document.createElement('li');
        li.id = "prog-item-" + prog.id;
        li.style.padding = '8px 12px';
        li.style.cursor = 'pointer';
        li.style.transition = 'all 0.2s';

        // Strip out the number prefix for cleaner sidebar
        const cleanTitle = prog.title.replace(/^\\d+\\.\\s*/, '');
        li.textContent = cleanTitle;

        li.addEventListener('mouseover', () => {
            if (li.style.fontWeight !== '600') li.style.background = '#f1f5f9';
        });
        li.addEventListener('mouseout', () => {
            if (li.style.fontWeight !== '600') li.style.background = 'transparent';
        });

        li.addEventListener('click', () => showProgramDetails(prog));

        if (prog.level.includes('Basic')) listBasic.appendChild(li);
        else if (prog.level.includes('Medium')) listMedium.appendChild(li);
        else listAdvanced.appendChild(li);
    });
}

// ==========================================
// APP: ROUTER & INIT
// ==========================================

const appContent = document.getElementById('app-content');
const pageTitle = document.getElementById('page-title');
const navItems = document.querySelectorAll('.nav-links li');

// Routes configuration
const routes = {
    theory: {
        title: 'Introduction to Lists',
        render: renderTheory
    },
    visualizer: {
        title: 'List Visualizer Playground',
        render: renderVisualizer
    },
    traversal: {
        title: 'Traversing a List',
        render: renderTraversal
    },
    slicing: {
        title: 'Slicing Workbench',
        render: renderSlicing
    },
    quiz: {
        title: 'Test Your Knowledge',
        render: renderQuiz
    },
    programming: {
        title: 'Programming Library',
        render: renderProgramming
    }
};

function init() {
    // Event Listeners for Navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.dataset.tab;
            navigateTo(tab);
        });
    });

    // Default route
    navigateTo('theory');
}

function navigateTo(tabName) {
    const route = routes[tabName];
    if (!route) return;

    // Update Sidebar UI
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelector("[data-tab='" + tabName + "']").classList.add('active');

    // Update Title
    pageTitle.textContent = route.title;

    // Transition Effect
    appContent.classList.remove('fade-in');
    void appContent.offsetWidth; // Trigger reflow
    appContent.classList.add('fade-in');

    // Render Content
    appContent.innerHTML = ''; // Clear current content
    route.render(appContent);
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
