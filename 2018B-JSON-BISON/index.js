const Parser = require("jison").Parser;

const grammar = {
  // flex / lex
  "lex": {
    "macros": {
      "digit" :  "[0-9]",
      "esc"   :  "\\\\",
      "int"   :  "-?(?:[0-9]|[1-9][0-9]+)",
      "exp"   :  "(?:[eE][-+]?[0-9]+)",
      "frac"  :  "(?:\\.[0-9]+)"
    },
    "rules": [
      [
        "\\s+",
        "/* skip whitespace */"
      ],[
        "{int}{frac}?{exp}?\\b",
        "return 'NUMBER';"
      ],[
        "\"(?:{esc}[\"bfnrt/{esc}]|{esc}u[a-fA-F0-9]{4}|[^\"{esc}])*\"",
        `
          yytext = yytext.substr(1,yyleng-2);
          return 'STRING';
        `
      ],[
        "\\{",
        "return '{'"
      ],[
        "\\}",
        "return '}'"
      ],[
        "\\[",
        "return '['"
      ],[
        "\\]",
        "return ']'"
      ],[
        ",",
        "return ','"
      ],[
        ":",
        "return ':'"
      ],[
        "true\\b",
        "return 'TRUE'"
      ],[
        "false\\b",
        "return 'FALSE'"
      ],[
        "null\\b",
        "return 'NULL'"
      ]
    ]
  },
  // Yacc // Bison
  "bnf": {
    "JSON" : [],
    "value" : [],
    "PROGRAM":[
      [ "JSONObject", `
        // Encerrar todo el json dentro de un objeto
        yy.jsonTree.unshift({
          level: 0,
          id: "<Begin-Object>",
          value: "",
        });
        yy.jsonTree.push({
          level: 0,
          id: "<End-Object>",
          value: "",
        });

        // Colocar donde inicia un objeto <Begin-Object>
        const arrAux = yy.jsonTree.slice();
        let aux = 1;
        for(let i = 0; i < arrAux.length; i++){
          if(arrAux[i].id == "<ID>" && arrAux[i+1].id == "<ID>"){
            yy.jsonTree.splice(i+aux,0,{
              level: 0,
              id: "<Begin-Object>",
              value: ""
            });
            aux++;
          }
        }
       
        // Establecer los niveles
        let level = 0;
        for(let i = 1; i < yy.jsonTree.length-1; i++){
          if(yy.jsonTree[i].id == "<Begin-Object>"){ level++; }
          if(yy.jsonTree[i].id == "<End-Object>"){ level--; }
          yy.jsonTree[i].level = level;
        }

        // Imprimir arbol
        console.log("┬");
        yy.jsonTree.forEach(obj=>{
          process.stdout.write("├")
          for(let i=0; i<obj.level; i++){ process.stdout.write("  ├"); }
          console.log("",obj.id, obj.value);
        });

        // Imprimir resultados
        // if(yy.jsonTreeLog){ console.log(yy.jsonTree); }

      `]
    ],


    "JSONObject": [
      [ "{ }",``],
      [ "{ JSONMemberList }",``]
    ],


    "JSONMemberList": [
      [ "JSONMember", ``],
      [ "JSONMemberList , JSONMember",``],
    ],

    "JSONMember": [
      [ "JSONID : JSONValue", ``]
    ],

    "JSONArray": [
      [ "[ ]",``],
      [ "[ JSONElementList ]",``]
    ],

    "JSONElementList": [
      [ "JSONValue", ``],
      [ "JSONElementList , JSONValue", ``]
    ],


    "JSONValue": [
      [ "JSONString",  `
        yy.jsonTree.push({
          level: 0,
          id: "<String>",
          value: yytext,
        });
      `],
      [ "JSONNumber",  `
        yy.jsonTree.push({
          level: 0,
          id: "<Number>",
          value: yytext,
        });
      `],
      [ "JSONBoolean", `
        yy.jsonTree.push({
          level: 0,
          id: "<Boolean>",
          value: yytext,
        });
      `],
      [ "JSONObject",  `
        yy.jsonTree.push({
          level: 0,
          id: "<End-Object>",
          value: "",
        });
      `],
      [ "JSONArray",   ``],
    ],
    
    "JSONID": [
      [ "STRING", `
        yy.jsonTree.push({
          level: 0,
          id: "<ID>",
          value: yytext,
        });
      `]
    ],

    "JSONString": [
      [ "STRING", ``]
    ],

    "JSONNumber": [
      [ "NUMBER", ``]
    ],

    "JSONBoolean": [
      [ "TRUE",  ``],
      [ "FALSE", ``],
      [ "NULL",  ``]
    ]


    
  }
};



const parser = new Parser(grammar);
parser.yy.jsonTree = [];
parser.yy.jsonTreeLog = true; 
parser.parse( require('./test2.js') );

// Guardar archivo que genera
// const fs = require('fs');
// fs.writeFile("./jison_code.js", parser.generate(), (err) =>{
//   if (err) { return console.log(err); }
//   console.log("The file was saved!");
// });
