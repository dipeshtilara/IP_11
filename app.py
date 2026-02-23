import streamlit as st
import streamlit.components.v1 as components
import os

# Set page config
st.set_page_config(page_title="AI Learning Hub: Lists", layout="wide")

def load_local_app():
    """
    Reads the local index.html and injects CSS/JS content inline so it can be 
    rendered perfectly through Streamlit's HTML component without missing assets.
    """
    base_dir = os.path.dirname(os.path.abspath(__file__))
    index_path = os.path.join(base_dir, "index.html")
    
    try:
        with open(index_path, "r", encoding="utf-8") as f:
            html_content = f.read()
    except Exception as e:
        return f"<h3>Error loading app: {e}</h3>"
        
    # Read CSS files
    css_files = ["styles/main.css", "styles/components.css", "styles/visualizer.css"]
    css_content = ""
    for css_file in css_files:
        css_path = os.path.join(base_dir, css_file)
        if os.path.exists(css_path):
            with open(css_path, "r", encoding="utf-8") as f:
                css_content += f"<style>\n{f.read()}\n</style>\n"
                
    # Remove old stylesheet links and add our inline CSS before </head>
    html_content = html_content.replace('<link rel="stylesheet" href="styles/main.css">', '')
    html_content = html_content.replace('<link rel="stylesheet" href="styles/components.css">', '')
    html_content = html_content.replace('<link rel="stylesheet" href="styles/visualizer.css">', '')
    html_content = html_content.replace('</head>', f"{css_content}</head>")
    
    # Read JS file
    js_path = os.path.join(base_dir, "js", "app.js")
    js_content = ""
    if os.path.exists(js_path):
        with open(js_path, "r", encoding="utf-8") as f:
            js_content = f"<script>\n{f.read()}\n</script>"
            
    # Inline Questions Data directly to avoid HTTP Fetch errors in Streamlit components
    json_path = os.path.join(base_dir, "questionbank.json")
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            json_data = f.read()
            html_content = html_content.replace('<script src="js/app.js"></script>', f"<script>window.QUIZ_DATA = {json_data};</script>\n<script src=\"js/app.js\"></script>")

    # Replace external script reference with inline script
    html_content = html_content.replace('<script src="js/app.js"></script>', js_content)
    
    return html_content

# Get the bundled HTML
html_str = load_local_app()

# Render the application within the Streamlit interface
components.html(html_str, height=900, scrolling=True)
