#! /bin/bash
java -jar closure-compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js main.js --js flora.js --js fauna.js --js_output_file evolve.js
#java -jar closure-compiler.jar --js main.js --js flora.js --js fauna.js --js_output_file evolve.js
