/*** Definition section ***/

%{
/* C code to be copied verbatim */
#include <stdio.h>
%}

/* This tells flex to read only one input file */

%option noyywrap

%%
    /* Ignorar los espaciones en blanco, saltos de linea y tabulaciones */
[ \n\t]+                             {  }
    /* Indentificadores */
[a-zA-Z_][a-zA-Z0-9_]*               { printf("type: id          value: %s \n",   yytext); }
    /* Numeros enteros */
[+-]?[1-9]+                          { printf("type: int         value: %s \n",   yytext); }
    /* Numero flotante */
[+-]?[0-9]*[.][0-9]+                 { printf("type: float       value: %s \n",   yytext); }
    /* Numero exponent */
[+-]?[0-9]*[.]?[0-9]*[eE][+-]?[0-9]+ { printf("type: expo        value: %s \n",   yytext); }
    /* Numero octal*/
[0-7]+                              { printf("type: octal       value: %s \n",   yytext); }
    /* Numero hexadecimal*/
[0][xX][0-9a-zA-F]+                  { printf("type: hexa        value: %s \n",   yytext); }
    /* Catacter */
['][a-zA-Z][']                       { printf("type: char        value: %s \n",   yytext); }
    /* Cadena de caracteres */
[a-zA-Z_]?\"(\\.|[^\\"])*\"          { printf("type: string      value: %s \n",   yytext); }
    /* caracter '+' */
"+"                                  { printf("type: op'+'       value: %s \n",   yytext); }
"+="                                 { printf("type: op'+='      value: %s \n",   yytext); }
"++"                                 { printf("type: op'++'      value: %s \n",   yytext); }
    /* caracter '-' */
"-"                                  { printf("type: op'-'       value: %s \n",   yytext); }
"-="                                 { printf("type: op'-='      value: %s \n",   yytext); }
"--"                                 { printf("type: op'--'      value: %s \n",   yytext); }
    /* caracter '*' */
"*"                                  { printf("type: op'*'       value: %s \n",   yytext); }
"*="                                 { printf("type: op'*='      value: %s \n",   yytext); }
"**"                                 { printf("type: op'**'      value: %s \n",   yytext); }
    /* caracter '/' */
"/"                                  { printf("type: op'/'       value: %s \n",   yytext); }
"/="                                 { printf("type: op'/='      value: %s \n",   yytext); }
"//".*                               { printf("type: comment1    value: %s \n",   yytext); }
    /*http://blog.ostermiller.org/find-comment*/
"/\*"([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*"\*/"      { printf("type: comment2    value: %s \n",   yytext); }
    /* caracter '%' */
"%"                                  { printf("type: op'%'       value: %s \n",   yytext); }
"%="                                 { printf("type: op'%='      value: %s \n",   yytext); }
    /* caracter '&' */
"&"                                  { printf("type: op'&'       value: %s \n",   yytext); }
"&&"                                 { printf("type: op'&&'      value: %s \n",   yytext); }
    /* caracter '|' */
"|"                                  { printf("type: op'|'       value: %s \n",   yytext); }
"||"                                 { printf("type: op'||'      value: %s \n",   yytext); }
    /* caracter '!' */
"!"                                  { printf("type: op'!'       value: %s \n",   yytext); }
"!="                                 { printf("type: op'!='      value: %s \n",   yytext); }
    /* caracter '<' */
"<"                                  { printf("type: op'<'       value: %s \n",   yytext); }
"<<"                                 { printf("type: op'<<'      value: %s \n",   yytext); }
"<="                                 { printf("type: op'<='      value: %s \n",   yytext); }
    /* caracter '>' */
">"                                  { printf("type: op'>'       value: %s \n",   yytext); }
">>"                                 { printf("type: op'>>'      value: %s \n",   yytext); }
">="                                 { printf("type: op'>='      value: %s \n",   yytext); }
    /* caracter '=' */
"="                                  { printf("type: op'='       value: %s \n",   yytext); }
"=="                                 { printf("type: op'=='      value: %s \n",   yytext); }
    /* caracter '?' */
"?"                                  { printf("type: op'?'       value: %s \n",   yytext); }
    /* caracter ':' */
":"                                  { printf("type: op':'       value: %s \n",   yytext); }
    /* caracter ';' */
";"                                  { printf("type: op';'       value: %s \n",   yytext); }
    /* caracter ',' */
","                                  { printf("type: op','       value: %s \n",   yytext); }
    /* caracter '{' */
"{"                                  { printf("type: op'{'       value: %s \n",   yytext); }
    /* caracter '}' */
"}"                                  { printf("type: op'}'       value: %s \n",   yytext); }
    /* caracter '(' */
"("                                  { printf("type: op'('       value: %s \n",   yytext); }
    /* caracter ')' */
")"                                  { printf("type: op')'       value: %s \n",   yytext); }
    /* caracter '[' */
"["                                  { printf("type: op'['       value: %s \n",   yytext); }
    /* caracter ']' */
"]"                                  { printf("type: op']'       value: %s \n",   yytext); }
.                                    { printf("type: undefined   value: %s \n",   yytext); }


%%
/*** C Code section ***/

int main(void){
    /* Call the lexer, then quit. */
    yylex();
    return 0;
}