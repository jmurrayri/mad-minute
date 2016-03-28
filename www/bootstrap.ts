import {bootstrap} from 'angular2/platform/browser';
import {bind} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

// included for development builds
import {ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
// included for production builds
import {enableProdMode} from 'angular2/core';

import AppComponent from './app/app';
import {QuizComponent} from './app/quiz/quiz.component';
import {ProblemComponent} from './app/problem/problem.component';

var providers = [
	HTTP_PROVIDERS
	ROUTER_PROVIDERS,
	bind(LocationStrategy).toClass(HashLocationStrategy)
];

if (process.env.NODE_ENV !== 'production') {
    providers.push(ELEMENT_PROBE_PROVIDERS);
}

if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}

bootstrap(AppComponent, providers)
	.then(success=>console.log('Bootstrap success'))
	.catch(error=>console.log(error));


