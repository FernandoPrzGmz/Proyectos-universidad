var modules = {};
modules.json = function () {
    var tokenizer;
    var tokens = [];
    var needle = 0;
    var output = "";
    var idHelper = 2100;
    var objectHelper = {};
    var genHelper = [];
    var globalClass = ``;

    /**
     * Desc
     * 
     * @param {array} matrix D
     * @returns {string} html D
     */
    function init(tknzr) {
        tokenizer = tknzr;
        tokenizer.on('data', function (token) {
            console.log(token);
            tokens.push(token);
        });
        document.getElementById("analizeBtn").addEventListener("click", analize, false);
    }

    function analize() {
        let input = document.getElementById("inputArea").value;
        let json = JSON.parse(input);
        idHelper = 2100;
        objectHelper = {};
        genHelper = [];
        globalClass = ``;
        console.log(json);
        makeFile(makeXMI(json));
        // tokenizer.end(String(input));
        // setTimeout(start, 1000);
    }

    function start() {
        if (jObject()) {
            makeTree();
            document.getElementById("errorLog").value = "El análisis ha finalizado exitosamente.";
            document.getElementById("errorLog").disabled = false;
        }
    }

    function makeFile(xmi) {
        var file = new Blob([xmi], {type: "text/html"});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, "test.xmi");
        else { // Others
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = "test.xmi";
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }

    function jValue() {
        let t = scan();
        if (t.type == "begin-object") {
            return jObject();
        } else if (t.type == "begin-array") {
            return jArray();
        } else if (t.type == "string" || t.type == "boolean" || t.type == "null" || t.type == "number") {
            return jString();
        } else {
            error(t, "valor", 100);
            return false;
        }
    }

    function jObject() {
        let t = scan();
        if (t.type == "begin-object") {
            nextToken();
            t = scan();
            if (t.type == "string") {
                if (jMembers()) {
                    nextToken();
                    t = scan();
                    if (t.type == "end-object") {
                        return true;
                    } else {
                        error(t, "objeto", 104, "}");
                    }
                } else {
                    return false;
                }
            } else {
                error(t, "objeto", 101);
                return false;
            }
        } else {
            error(t, "objeto", 103, "{");
            return false;
        }
    }

    function jArray() {
        let t = scan();
        nextToken();
        if (jElements()) {
            nextToken();
            t = scan();
            if (t.type == "end-array") {
                return true;
            } else {
                error(t, "array", 105, "]");
                return false;
            }
        } else {
            return false;
        }
    }

    function jMembers() {
        if (jMember()) {
            nextToken();
            let t = scan();
            if (t.content == ",") {
                nextToken();
                return jMembers();
            }
            previousToken();
            return true;
        } else {
            return false;
        }
    }

    function jMember() {
        if (jString()) {
            nextToken();
            let t = scan();
            if (t.content == ":") {
                nextToken();
                return jElement();
            } else {
                error(t, "objeto", 102, ":");
                return false;
            }
        } else {
            return false;
        }
    }

    function jElements() {
        if (jElement()) {
            nextToken();
            let t = scan();
            if (t.content == ",") {
                nextToken();
                return jElements();
            }
            previousToken();
            return true;
        }
    }

    function jElement() {
        return jValue();
    }

    function jString() {
        let t = scan();
        let keepLine = scanPrevious().content == ":";
        return true;
    }

    function error(token, structure, errorCode = false, expected = false) {
        let eC = errorCode ? `ERROR: ${errorCode}.` : "";
        let e = expected ? ` Se esperaba "${expected}"` : "";
        document.getElementById("errorLog").value = `${eC} '${token.content} - ${token.type}' no es parte de un ${structure}.${e}`;
    }

    function makeTree() {
        let html = `<ul>`;

        for (var i = 0; i < tokens.length - 1; i++) {
            let token = tokens[i];
            if (token.type == "begin-object") {
                html += `<li><b>&lt;object&gt;</b><ul>`;
            } else if (token.type == "end-object") {
                html += `</ul></li>`;
            } else if (token.type == "begin-array") {
                html += `<li><b>&lt;array&gt;</b><ul>`;
            } else if (token.type == "end-array") {
                html += `</ul></li>`;
            } else if (token.type == "string" && tokens[i + 1].type == "end-label") {
                html += `<li><b>&lt;id&gt;</b>${token.content}`;
            } else if (token.type != "end-label" && token.type != "comma") {
                html += `<li><b>&lt;${token.type}&gt;</b>${token.content}</li>`;
            }
        }

        html += `</ul>`;
        document.getElementById("outputArea").innerHTML = html;
    }

    function makeXMI(json) {
        let xmi = makeHeader();
        xmi += `<UML:Namespace.ownedElement>`;
        runRecursive(json, "main");
        xmi += globalClass;
        xmi += makeMainGeneralizationXMI();
        xmi += `</UML:Namespace.ownedElement>`;
        xmi += `</UML:Model>`;
        xmi += `</XMI.content>`;
        xmi += `</XMI>`;
        return xmi;
    }

    function runRecursive(json, mainElement) {
        let attributesXMI = ``;
        let generalizationsXMI = ``;

        for (const [key, value] of Object.entries(json)) {
            if (value instanceof Object && !(Array.isArray(value))) {
                manageID(key);
                generalizationsXMI += makeClassGeneralizationXMI(mainElement, key);
                runRecursive(json[key], key);
            } else {
                attributesXMI += makeAttributeXMI(key);
            }
        }

        if ( generalizationsXMI ) {
            generalizationsXMI = `
                <UML:GeneralizableElement.generalization>
                    ${generalizationsXMI}
                </UML:GeneralizableElement.generalization>
            `;
        }

        addClass(makeClassXMI(mainElement, attributesXMI, generalizationsXMI));
    }

    function makeAttributeXMI(title) {
        let id_1 = makeID();
        let id_2 = makeID();
        let id_3 = makeID();

        let xmi = `
            <UML:Attribute xmi.id = '${id_1}'
            name = '${title}' visibility = 'public' isSpecification = 'false' ownerScope = 'instance'
            changeability = 'changeable' targetScope = 'instance'>
                <UML:StructuralFeature.multiplicity>
                    <UML:Multiplicity xmi.id = '${id_2}'>
                        <UML:Multiplicity.range>
                            <UML:MultiplicityRange xmi.id = '${id_3}'
                            lower = '1' upper = '1'/>
                        </UML:Multiplicity.range>
                    </UML:Multiplicity>
                </UML:StructuralFeature.multiplicity>
                <UML:StructuralFeature.type>
                    <UML:DataType href = 'http://argouml.org/profiles/uml14/default-uml14.xmi#-84-17--56-5-43645a83:11466542d86:-8000:000000000000087E'/>
                </UML:StructuralFeature.type>
            </UML:Attribute>
        `;

        return xmi;
    }

    function makeClassGeneralizationXMI(parent, child) {
        let id = makeID();

        genHelper.push({
            'id': id,
            'parentID': manageID(parent),
            'childID': manageID(child)
        });

        return `<UML:Generalization xmi.idref = '${id}'/>`;
    }

    function makeMainGeneralizationXMI() {
        let xmi = ``;

        for (let i = 0; i < genHelper.length; i++) {
            xmi += `
            <UML:Generalization xmi.id = '${genHelper[i].id}'
                isSpecification = 'false'>
                <UML:Generalization.child>
                    <UML:Class xmi.idref = '${genHelper[i].parentID}'/>
                </UML:Generalization.child>
                <UML:Generalization.parent>
                    <UML:Class xmi.idref = '${genHelper[i].childID}'/>
                </UML:Generalization.parent>
            </UML:Generalization>
            `;
        }

        return xmi;
    }

    function makeHeader() {
        let id = makeID();
        let xmi = `<?xml version = '1.0' encoding = 'UTF-8' ?>`;
        xmi += `<XMI xmi.version = '1.2' xmlns:UML = 'org.omg.xmi.namespace.UML' timestamp = 'Tue Nov 27 11:44:33 ACT 2018'>`;
        xmi += `  <XMI.header>    <XMI.documentation>
                        <XMI.exporter>ArgoUML (using Netbeans XMI Writer version 1.0)</XMI.exporter>
                        <XMI.exporterVersion>0.34(6) revised on $Date: 2010-01-11 22:20:14 +0100 (Mon, 11 Jan 2010) $ </XMI.exporterVersion>
                    </XMI.documentation>
                    <XMI.metamodel xmi.name="UML" xmi.version="1.4"/></XMI.header>
                    <XMI.content>
                    <UML:Model xmi.id = '${id}'
                      name = 'untitledModel' isSpecification = 'false' isRoot = 'false' isLeaf = 'false'
                      isAbstract = 'false'>`;
        return xmi;
    }

    function addClass(classXMI) {
        globalClass += classXMI;
    }

    function makeClassXMI(mainElement, attributesXMI, generalizationsXMI) {
        let id = manageID(mainElement);

        let classXMI = `
            <UML:Class xmi.id = '${id}'
            name = '${mainElement}' visibility = 'public' isSpecification = 'false' isRoot = 'false'
            isLeaf = 'false' isAbstract = 'false' isActive = 'false'>
                ${generalizationsXMI}
                <UML:Classifier.feature>
                    ${attributesXMI}
                </UML:Classifier.feature>
            </UML:Class>
        `;

        return classXMI;
    }

    function manageID(title) {
        if (!(title in objectHelper)) {
            objectHelper[title] = makeID();
        }

        return objectHelper[title];
    }

    function increaseID() {
        idHelper++;
    }

    function makeID() {
        idHelper++;
        let hexID = idHelper.toString(16);
        return `-64--88-1-4-aa73dab:16755fe8bd0:-8000:0000000000000${hexID}`;
    }

    function scan() {
        return tokens[needle];
    }

    function scanNext() {
        return tokens[needle + 1];
    }

    function scanPrevious() {
        return tokens[needle - 1];
    }

    function nextToken() {
        needle++;
    }

    function previousToken() {
        needle--;
    }

    return {
        init,
        analize,
    }
}();