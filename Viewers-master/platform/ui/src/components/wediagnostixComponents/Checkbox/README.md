#How to use

`<Checkbox id=string label=string name=string isChecked=bool hasError=bool onChange={() => fun}></Checkbox>`

<dl>
    <dt>id: (required)</dt>
    <dd>Id of the checkbox, should be unique</dd>
    <dt>label: (not required)</dt>
    <dd>Label of the checkbox, displayed beside it, on the right side</dd>
    <dt>name: (not required)</dt>
    <dd>name of the checkbox</dd>
    <dt>isChecked: (not required) default: false</dt>
    <dd>Value indicating if the checkbox is checked by default</dd>
    <dt>hasError: (not required): default: false</dt>
    <dd>When enable, pass checkbox to red<dd>
    <dt>Type: 'switch' 'checkbox' (not required): default 'checkbox'</dt>
    <dd> Param use to define which type of checkbox to render (classic or switch)</dd>
    <dt>onChange: function() (required)</dt>
    <dd>Function pass to the component to handle change of state (check/uncheck)</dd>
</dl>          
