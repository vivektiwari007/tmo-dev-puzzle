What is done well?

1.Use of NGRX approach along with RXJS features for application state management.
2.Use of Facade to wrap and blackbox NgRx simplifies accessing and modifying NgRx state by masking internal all interactions with the Store, actions, reducers, selectors, and Effects.
3.Use of Hapi Js as a proxy layer for segregating the responsibility of making the API calls as Hapi JS has multiple plugins support which can be used to extend its capabilities. 
4.Best practises were being used as data was being passed from parent to child component using @Input binding i.e Unidirectional Data Flow.

What would you change?
1)Fixed Chart Not Loading Issue as part of this PR
2)Fixed failing test cases as part of this PR
3)Added code refactoring changes like use of constants and interfaces and used access specifiers wherever possible.

Are there any code smells or problematic implementations?
1.Chart was not loading due to API Token not present in environment.ts file.
2.Fix in chart.component.html file as ngIf check was based on data instead of chartData which was populated in TS file.
3.Access Specifiers were not present and proper code refactoring was not done.
4.Test Cases were failing for app,stocks and chart component.