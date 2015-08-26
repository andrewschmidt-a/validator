# validator
A jquery validator plugin for bootstrap based forms
<article class='col-md-12'>
				<h3>Core Methods</h3>
				<p>
					Below you will find the list of methods that the library contains. They are made to follow exactly what you would like
					the validator script to do, such as set and check, and other initialization methods:
				</p>
				<ul>
					<li><code>validator(options)</code> : the initial function that sets all your controls</li>
					<li><code>validator.check()</code> : checks the form that the validator is attached to</li>
					<li><code>validator.setCCImage(options)</code> : initializes the credit card images for the credit cart number validations</li>
				</ul>
				<hr />
			</article>
			<article class='col-md-12'>
				<h3 class='text-info'>$.validator</h3>
				<p>This is a demonstration on how to the initial function <code>.validator</code></p>
				<p>Other features that come along with the initialization is the ability for the form to validate on keyup, change, select, focus, and click</p>
<pre>
<code>
	/**
	* validator.js attaches itself to a single form element
	* For this example our form has the id of 'testForm'
	*/
	$('#testForm').validator({
		/* here is where you would insert your options */
	});
</code>
</pre>
 </article>
	<article class='col-md-12'>
		<h4 class='text-danger'>$.validator Options</h4>
		<table class='table table-condensed table-striped table-hover table-bordered'>
			<thead>
				<tr>
					<th class='col-xs-2'>Name</th>
					<th class='col-xs-2'>Type</th>
					<th class='col-xs-8'>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>notEmpty</td>
					<td>Array</td>
					<td>
						Forces the designated inputs to have a value when the form is validated
					</td>
				</tr>
				<tr>
					<td>required</td>
					<td>Array</td>
					<td>
						*See 'notEmpty'
					</td>
				</tr>
				<tr>
					<td>isEmail</td>
					<td>Array</td>
					<td>
						Forces the designated inputs to be a valid e-mail address
					</td>
				</tr>
				<tr>
					<td>isPhoneNumber</td>
					<td>Array</td>
					<td>
						Forces the designated inputs to be a valid phone number. It will check for a phone number
						with and without the country code
					</td>
				</tr>
				<tr>
					<td>isNumber</td>
					<td>Array</td>
					<td>
						Forces the designated inputs to be valid integer or floating point numbers
					</td>
				</tr>
				<tr>
					<td>isSSN</td>
					<td>Array</td>
					<td>
						Forces the designated inputs to be valid social security numbers
					</td>
				</tr>
				<tr>
					<td>isString</td>
					<td>Array</td>
					<td>
						Forces the designated inputs to be a valid string
					</td>
				</tr>
				<tr>
					<td>isURL</td>
					<td>Array</td>
					<td>Forces the designated inputs to be a valid web address</td>
				</tr>
				<tr>
					<td>isDateTime</td>
					<td>Mixed<br>Array/Mixed Array/Object</td>
					<td>
						<h4>Usage</h4>
						Validates the given input as a dateTime. Below are examples of the three different ways
						you can passed the information to the isDateTime function:
<pre>
<code>

// as just an array, note that if it is passed as an array a default pattern of 'm/d/Y' exists
isDateTime : ['selector1', 'selector2']

// as a mixed array 
isDateTime : [
	'selector1',
	['selector2', 'm-d-Y h:s']
]

// as an object
isDateTime : {
	'selector1' : 'm-d-Y h:s',
	'selector2' : 'm/d/Y'
}
</code>
</pre>
<h4>Pattern Options</h4>
Familiarity with the date constants for the <code>date()</code> function in PHP will help 
with this, as this is where the pattern concept is derived from. The following table below has
all the accepted constants and what they represent: 
<table class='table table-striped table-condensed'>
	<tr><th>Constant</th><th>Description</th></tr>
	<tr><th>d</th><td>day of the month with leading zeroes</td></tr>
	<tr><th>j</th><td>day of the month no leading zeroes</td></tr>
	<tr><th>D</th><td>day of the week as 3-letter abbreviation</td></tr>
	<tr><th>l (lowercase "L")</th><td>full textual day of the week</td></tr>
	<tr><th>F</th><td>full textual representation of the month</td></tr>
	<tr><th>M</th><td>month as a 3-letter abbreviation</td></tr>
	<tr><th>m</th><td>two digit month with leading zeros</td></tr>
	<tr><th>n</th><td>two digit month with no leading zeros</td></tr>
	<tr><th>Y</th><td>four digit year</td></tr>
	<tr><th>y</th><td>two digit year</td></tr>
	<tr><th>g</th><td>12-hour format no leading zeros</td></tr>
	<tr><th>G</th><td>24-hour format no leading zeros</td></tr>
	<tr><th>h</th><td>12-hour format with leading zeros</td></tr>
	<tr><th>H</th><td>24-hour format with leading zeros</td></tr>
	<tr><th>i</th><td>minutes with leading zeros</td></tr>
	<tr><th>s</th><td>seconds with leading zeros</td></tr>
	<tr><th>a/A/p/P</th><td>am/AM/pm/PM</td></tr>
	<tr><th>
		<code>"/"</code>,
		<code>":"</code>,
		<code>" "</code>,
		<code>"-"</code>,
		<code>","</code>,
		<code>"."</code></th><td>Forward slash, colon, space, hyphen, comma, and period are all the recognized non word characters for a datetime pattern</td></tr>
									

			</table>
		</td>
	</tr>
	<tr>
		<td>groupNotEmpty</td>
		<td>Array</td>
		<td>Each selector in the array is a selector for a group of radio buttons and/or check boxes. It will check to see if at least one of them is filled in. Adding this function makes it a require field</td>
	</tr>
	<tr>
		<td>isRoutingNumber</td>
		<td>Array</td>
		<td>Forces the values for each selector to be a valid routing number</td>
	</tr>
	<tr>
		<td>isMacAddress</td>
		<td>Array</td>
		<td>Forces the values for each selector to be a valid Mac Address</td>
	</tr>
	<tr>
		<td>isIPAddress</td>
		<td>Array</td>
		<td>Forces the values for each selector to be a valid IP Address</td>
	</tr>
	<tr>
		<td>validPassword</td>
		<td>Array</td>
		<td>
			Forces the values to be a valid password based on the given strength parameters for the function.
			Below is a table that will go over the different requirements and strength value for each password check:
			<table class='table table-striped table-condensed'>
				<tr><th>Requirement</th><th>Strength</th></tr>
				<tr><td>Is a password of at least 8 characters</td><td>40</td></tr>
				<tr><td>is at least 12 characters long</td><td>10</td></tr>
				<tr><td>Is at least 16 characters long</td><td>10</td></tr>
				<tr><td>Contains at least 1 lower case letter</td><td>10</td></tr>
				<tr><td>Contains at least 1 upper case letter</td><td>10</td></tr>
				<tr><td>Contains at least 1 number</td><td>10</td></tr>
				<tr><td>Contains at least 1 of these symbols <code>! $ @ #</code></td><td>10</td></tr>
			</table>
			The password will validate at strength <strong>60</strong> or higher
		</td>
	</tr>
	<tr>
		<td>equalTo</td>
		<td>Object</td>
		<td>
		Takes a list of key value pairs where the key is the selector this function is attached to and the value 
		is the selector that it is being compared to.

		<h4>Example</h4>
<pre>
<code>
/**
* '#selector' is the active input being compared
* '#comparingTo' is the input that '#selector' is being compared to
*/
equalTo : {
'#selector' : '#comparingTo'
}
</code>
</pre>
		</td>
	</tr>
	<tr>
		<td>isCreditCard</td>
		<td>Array</td>
		<td>Forces the inputs to be a valid credit card number</td>
	</tr>
	<tr>
		<td>isZipCode</td>
		<td>Array</td>
		<td>Forces the inputs to be a valid zip code. Will validate in the <code>12345</code> form and <code>12345-6789</code> form</td>
	</tr>
	<tr>
		<td>isDependent</td>
		<td>Object<br></td>
		<td>Forces a pair or group of inputs to be dependent on eachother based on a selector set.
			<h4>Usage</h4>
			<p>
				You can pass, as the dependent selector, either a classname or a string preceeded by an underscore '_'. 
				If you pass an underscore selector the function will only search out the elements based on their data-validator attribute.
			</p>
<pre>
<code>
/** 
* pass an object of selectors and targets
*/	
isDependent : {
'#selector1' : '_group',
'#selector2' : '_group',
'#selector3' : '.class'
}
</code>
</pre>
			<p>
				As you can see in the above example <code>#selector1</code> and <code>#selector2</code> are dependent on eachother while <code>#selector3</code> is
				dependent on <code>.class</code>
			</p>
		</td>
	</tr>
	<tr>
		<td>testRegex</td>
		<td>Object</td>
		<td>
			Checks the input against a regex.
			<h4>Usage</h4>
<pre>
<code>
/**
* pass the regex pattern as a string options
*/
testRegex : {
'#selector' : '/pattern/'
}
</code>
</pre>
		</td>
	</tr>
</tbody>
</table>
</article>
<article class='col-xs-12'>
<hr />
<h3 class='text-info'>$.validator.check()</h3>
<p><code>.check()</code> is the final check for your form before attempting any further action with it.
<code>.check()</code> returns a boolean of true or false. 
</p>
<h4>Usage</h4>
<pre>
<code>
/**
* simply call validator.check() to see if your form is valid
*/
$('#form').submit(function(e){
e.stopPropagation();
if($(this).validator.check()){
// process the form if the result is true
}else{
// throw out an error or handle how you want
}
})
</code>
</pre>
</article>
<article class='col-xs-12'>
<hr />
<h3 class='text-info'>$.validator.setCCImage()</h3>
<p><code>.setCCImage()</code> generates the credit card images for your credit card validation input</p>
<p>Remember to make sure you have the image directory that comes with this plugin located somewhere on your server</p>
<h4>Options</h4>
<table class='table table-striped table-condensed'>
<tr>
	<th>Option</th>
	<th>Type</th>
	<th>Description</th>
</tr>
<tr>
	<th>target</th>
	<td>string</td>
	<td>The id, class, or name that you wish to append this image set to.</td>
</tr>
<tr>
	<th>path</th>
	<td>string</td>
	<td>The path to the image folder for the credit card images.</td>
</tr>
</table>
<h4>Example</h4>
<pre>
<code>
/**
* simply call validator.check() to see if your form is valid
*/
$('#form').validator.setCCImage({
target : '#cc',
path : //path to image files
});
</code>
</pre>
</article>
