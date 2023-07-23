const code = document.querySelectorAll('[data-language]')
var str = ''

function highlight(text) {
    var attr = /(\s[a-zA-Z:]+(?==))|(disabled)/g, //ok
        tag = /(&lt;[w]+)|(&lt;[\/\w]+)|&gt;/g, //ok
        value = /(\".+\")|(\'.+\')/g, //ok
        spec = /([a-zA-Z]+(?=:))|(\w{2,3}\?)/g, //ok
        mod = /(?<=\[)[^\]]+(?=])/g, //ok
        comment = /([\/]{2}.*\n)|(&lt;!--.*\;)/g; //ok
    
    var t = text
    t = t.replace(tag, (m)=> {return '$tg'+m+'$fn'})
    t = t.replace(attr, (m)=> {return '$an'+m+'$fn'})
    t = t.replace(value, (m)=> {return '$vl'+m+'$fn'})
    t = t.replace(mod, (m)=> {return '$md'+m+'$fn'})
    t = t.replace(spec, (m)=> {return '$sx'+m+'$fn'})
    t = t.replace(comment, (m)=>{return '$cm'+m+'$fn'})

    return t;
}
function conform(text){
    var fn = /\$fn/g,
        an = /\$an/g,
        vn = /\$vl/g,
        v2 = /\$md/g,
        tn = /\$tg/g,
        sp = /\$sx/g,
        cn = /\$cm/g;

    var t = text
    t = t.replaceAll(tn, '<span class="tag">')
    t = t.replaceAll(an, '<span class="attr">')
    t = t.replaceAll(vn, '<span class="value">')
    t = t.replaceAll(sp, '<span class="spec">')
    t = t.replaceAll(v2, '<span class="value-mod">')
    t = t.replaceAll(cn, '<span class="comment">')
    t = t.replaceAll(fn, '</span>')
    
    return t
}

// getting code
code.forEach(function(elt){
    str = elt.innerHTML        
    
    //setting code reformated
    str = highlight(str)
    elt.innerHTML = conform(str)
})
