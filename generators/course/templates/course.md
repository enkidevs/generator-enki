name: <%= name %>

core: <%= core %>

description: Description of the course goes here

sections:
	'0':
		- workout-slug-1
		- workout-slug-2
	'1':
		- workout-slug-3

standards:
	standard-slug:
		name: This is the standard's name
		description: This is the detailed description of what goes into the standard.
		objectives:
			0: create an ordered list
			1: name all of the things you want covered in the standard
			2: add objectives about interstitial learning steps to cover
			3: also add higher-level objectives towards the end that are more advanced than the first few
	another-slug:
		name: This is the standard's name
		description: This is the detailed description of what goes into the standard.
		objectives:
			0: create an ordered list
			1: name all of the things you want covered in the standard
			2: add objectives about interstitial learning steps to cover
			3: also add higher-level objectives towards the end that are more advanced than the first few

<%= nextSection %>