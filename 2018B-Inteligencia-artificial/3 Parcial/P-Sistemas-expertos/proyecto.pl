d(X^N,X,N*X^M):- number(N),M is N-1.
d(X,X,1).
d(N,X,0):- atomic(N), N\=X.
d(sen(X),X,cos(X)).
d(cos(X),X,-sen(X)).
d(tan(X),X,sec(x)^2).
d(cot(U),X,-(csc(U)*csc(U))*DU) :- d(U,X,DU).
d(sec(U),X,sec(U)*tan(U)*DU):- d(U,X,DU).
d(csc(U),X,-csc(U)*cot(U)*DU):- d(U,X,DU).
d(arcsen(U),X,DU/(1-U^2)^1/2):- \+ number(X), d(U,X,DU).
d(arccos(U),X,-DU/(1-U^2)^1/2):- \+ number(X), d(U,X,DU).
d(arctan(U),X,DU/(1+U^2)):- d(U,X,DU).
d(arccot(U),X,-DU/(1+U^2)):- d(U,X,DU).
d(arcsec(U),X,DU/(U*(U^2-1)^1/2)):- \+ number(X), d(U,X,DU).
d(arccsc(U),X,-DU/(U*(U^2-1)^1/2)):- \+ number(X), d(U,X,DU).
d(senh(X),X,cosh(X)).
d(senh(X),X,(e^X + e^(-X))/2) :- \+ number(X).
d(cosh(X),X,senh(X)).
d(cosh(X),X,(e^X - e^(-X))/2) :- \+ number(X).
d(tanh(X),X,sech(x)^2).
d(sech(U),X,-tanh(U)*sech(U)*DU):- d(U,X,DU).
d(csch(U),X,-coth(U)*csch(U)*DU):- d(U,X,DU).
d(coth(U),X,-(csch(U)*csch(U))*DU) :- d(U,X,DU).
d(arcsenh(U),X,DU/(U^2+1)^1/2):- \+ number(X), d(U,X,DU).
d(arccosh(U),X,DU/(U^2-1)^1/2):- \+ number(X), d(U,X,DU).
d(arctanh(U),X,DU/(1-U^2)):- d(U,X,DU).
d(arccoth(U),X,-DU/(1+U^2)):- d(U,X,DU).
d(e(X),X,e(X)).
d(ln(U),X,DU/U):- d(U,X,DU).
d(log(A,U), X, ln(A)*DU/U):- number(A), \+ number(U), d(U,X,DU).
d(A^U,X,A^U*ln(A)*DU):-number(A),d(U,X,DU).
d(X^A/B,X,A/B * X^C/B):- \+ number(X), number(A), number(B), C is A-B. %raiz

%!reglas mas generales
d(F+G,X,DF+DG):- d(F,X,DF),d(G,X,DG).
d(F-G,X,DF-DG):- -d(F,X,DF),-d(G,X,DG).
d(A*F,X,A*DF):- number(A),d(F,X,DF).
d(F*G,X,F*DG+G*DF):- \+ number(F), \+ number(G), d(F,X,DF),d(G,X,DG).
d(F/A,X,(1/A)/DF):- number(A),d(F,X,DF).
d(A/F,X,(-A*DF/F^2)):- number(A),d(F,X,DF).
d(F/G,X,(G*DF-F/DG)/G*G):- \+ number(F), \+ number(G), d(F,X,DF),d(G,X,DG).
