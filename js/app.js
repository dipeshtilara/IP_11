
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
    quiz: {
        title: 'Test Your Knowledge',
        render: (container) => {
            container.innerHTML = '<div class="card"><h2>Coming Soon</h2><p>The quiz module is currently under development.</p></div>';
        }
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
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

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
