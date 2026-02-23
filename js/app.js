
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
        render(); // Full re-render is easiest for insert to act correctly visually

        // Highlight the new node? 
        // We can find it and animate it
        const nodes = listDisplay.children;
        if (nodes[actualIdx]) {
            nodes[actualIdx].classList.add('entering');
            setTimeout(() => nodes[actualIdx].classList.remove('entering'), 400);
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

            let bgCol = '#313244'; // Unprocessed
            let borderCol = '#45475a';
            let txtCol = '#cdd6f4';

            if (isProcessed) { bgCol = '#a6e3a1'; borderCol = '#a6e3a1'; txtCol = '#11111b'; }
            if (isActive) { bgCol = '#f9e2af'; borderCol = '#f39c12'; txtCol = '#11111b'; boxShadow = '0 0 10px #f39c12'; }

            const pointVar = currentMode === 'index' ? `i=${i}` : `val="${item}"`;
            const headerStr = isActive ? `<div style="color:#f39c12; font-weight:bold; position:absolute; top:-35px; left:0; width:100%; text-align:center; white-space:nowrap;">&darr; ${pointVar}</div>` : '';

            const shadow = isActive ? 'box-shadow: 0 0 15px rgba(243, 156, 18, 0.6);' : '';
            const transform = isActive ? 'transform: translateY(-5px);' : '';

            boxContainer.innerHTML += `
                <div style="position:relative; margin-top:20px; transition: all 0.3s ease; width:80px; height:80px; background:${bgCol}; border:2px solid ${borderCol}; border-radius:8px; display:flex; flex-direction:column; justify-content:center; align-items:center; color:${txtCol}; ${shadow} ${transform}">
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
                    
                    <!-- Live Formula -->
                    <div style="background:#1e1e2e; color:#cdd6f4; font-family:'Fira Code', monospace; padding:1.2rem; border-radius:8px; border-left:4px solid #f39c12; margin-bottom:2rem; box-shadow:0 4px 6px rgba(0,0,0,0.1);">
                        <div style="color:#89b4fa; margin-bottom:0.5rem;">my_list = ["A", "B", "C", "D", "E", "F", "G"]</div>
                        <div style="font-size:1.2rem; display:flex; align-items:center;">
                            re_list = my_list[<span id="code-start" style="color:#f38ba8; margin:0 2px;"></span>:<span id="code-stop" style="color:#a6e3a1; margin:0 2px;"></span>:<span id="code-step" style="color:#f9e2af; margin:0 2px;">1</span>]
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
