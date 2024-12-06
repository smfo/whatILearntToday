# Vite

A build too that aims to provide a fast and lean development experience for frontend applications.\
Consists of two major parts
- A dev server that provides a rich feature enhancement over native ES modules
- A build command that bundles code with Rollup

Bundler frontendkode, fjerner kode som den mener ikke blir brukt\
Laster inn sider mye raskere. Istedenfor å f.eks. bundle alt sammen i samme lib fil. Det gjør at spesielt første innlogging blir mye raskere. 
Nettleserene cacher js filene mye, så etterhvert mister man litt effekten av at Vite er raskere enn standart lasting og gjør litt smartere valg. 
Kan lage mange små chunck filer som f.eks. inneholder dependencies. Disse kan lastes parallellt istedenfor at alt skal lastes samtidig og i riktig rekkefølge.\
Lager moduler for scripts, alle js filene er egne filer. Vite kan også slå sammen moduler hvis to scripts alltid brukes samtidig

Vite server hoster filene for deg