//class to select element(s) on html page.
export class getEl
{
    //get single elements only
    static gEID(el, scope)
    {
        return (scope || document).getElementById(el);
    }

    static select(selector, scope)
    {
        return (scope || document).querySelector(selector);
    }
    
    //get multiple elements    
    static gETN(element, index = -1, scope)
    {
        if(index < 0)
        {
            return (scope || document).getElementsByTagName(element);
        } else {
            return (scope || document).getElementsByTagName(element)[index];
        }        
    }

    static gECN(element, index = -1, scope)
    {
        if(index < 0)
        {
            return (scope || document).getElementsByClassName(element);
        } else {
            return (scope || document).getElementsByClassName(element)[index];
        }
    }

    static gEN(element, index = -1, scope)
    {
        if(index < 0)
        {
            return (scope || document).getElementsByName(element);
        } else {
            return (scope || document).getElementsByName(element)[index];
        }
    }
    
    static selectAll(selector, scope, index = -1)
    {
        if(index < 0)
        {
            return (scope || document).querySelectorAll(selector);
        } else {
            return (scope || document).querySelectorAll(selector)[index];
        }
    }
}

//class to manipulate events for html page.
export class Event
{
    static listen(target, event, callback, capture = false)
    {
        target.addEventListener(event, callback, !!capture);
    }

    static removeEvent(target, event, callback, capture = false)
    {
        target.removeEventListener(event, callback, !!capture);
    }
    static eventLog(e)
    {
        console.log(e.target);
    }
}

//class to add new elements and css selectors to html page.
export class AddEl
{
    //create an element without css tags
    static createElement(tag)
    {
        const el = document.createElement(tag);
        return el;
    }
    //create an element with css tags.
    static createElementCSS(tag, id, idValue, className)
    {
        const el = document.createElement(tag);
        if(id && idValue) el.setAttribute(id, idValue);
        if(className) el.classList.add(className);
        return el;
    }

    //add css tags to element
    static addCSS(element, id, idValue, className)
    {
        if(id && value) element.setAttribute(id, idValue);
        if(className) element.classList.add(className);
    }
    
    //append element to parent with text.
    static AppendText(el, text, parent)
    {
        const newEl = document.createElement(el);
        const newText = document.createTextNode(text);
        newEl.appendChild(newText);
        parent.appendChild(newEl);
    }
}

//class to remove elements from the page.
export class RemEl
{
    //clear all children from parent element
    static deleteChildElements(parent)
    {
        let child = parent.lastElementChild;
        while(child)
        {
            parent.removeChild(child);
            child = parent.lastElementChild;
        }
    }
}

export const sanitizeInput = (inputValue) =>
{
    const div = document.createElement('div');
    div.textContent = inputValue;
    return div.innerHTML;
};
