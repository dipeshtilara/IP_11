export const theoryContent = {
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

export function renderTheory(container) {
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
        if(e.target.tagName === 'BUTTON') {
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
