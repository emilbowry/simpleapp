


```markdown
	|A			  |B            |C       	  |
----+-------------+-------------+-------------+
1:	|      o      |       o     |o           o|
	|             |       	    |       	  |
	|  o          |o       	   o|      o      |
	|       	  |             |             |
	|       o     |      o      |o           o|
----+-------------+-------------+-------------+
2:	|             |             |       	  |
	|      o      |  o      o   |    o     o  |
	|             |       	    |             |
	|  o	   o  |    o      o | o     o    o|
	|             |             |       	  |
----+-------------+-------------+-------------+
3:	|       	  |       	    |      o      |
	|       	  |    o    o   |      o      |
	|   o  o  o   |       	    |      o      |
	|       	  |    o    o   |      o      |
	|       	  |       	    |      o      |
	+-------------+-------------+------------+
```

     
```markdown
o
o
o
```

```markdown
  o  
o   o
```

|       | A                    | B            | C               |
| ----- | -------------------- | ------------ | --------------- |
| **1** | o o o                | o  o<br>o  o | o<br>o<br>o<br> |
| **2** | o<br>o<br>     o<br> |              |                 |
----
input:
i:True, j:True, k:True

calculations:
(i := j) == k ==> True
True, True, True
***
(i := j) != k ==> False
True, True, True
----


----
input:
i:True, j:True, k:False

calculations:
(i := j) == k ==> False
True, True, False
***
(i := j) != k ==> True
True, True, False
----


----
input:
i:True, j:True, k:None

calculations:
(i := j) == k ==> False
True, True, None
***
(i := j) != k ==> True
True, True, None
----


----
input:
i:True, j:False, k:True

calculations:
(i := j) == k ==> False
False, False, True
***
(i := j) != k ==> True
False, False, True
----


----
input:
i:True, j:False, k:False

calculations:
(i := j) == k ==> True
False, False, False
***
(i := j) != k ==> False
False, False, False
----


----
input:
i:True, j:False, k:None

calculations:
(i := j) == k ==> False
False, False, None
***
(i := j) != k ==> True
False, False, None
----


----
input:
i:True, j:None, k:True

calculations:
(i := j) == k ==> False
None, None, True
***
(i := j) != k ==> True
None, None, True
----


----
input:
i:True, j:None, k:False

calculations:
(i := j) == k ==> False
None, None, False
***
(i := j) != k ==> True
None, None, False
----


----
input:
i:True, j:None, k:None

calculations:
(i := j) == k ==> True
None, None, None
***
(i := j) != k ==> False
None, None, None
----


----
input:
i:False, j:True, k:True

calculations:
(i := j) == k ==> True
True, True, True
***
(i := j) != k ==> False
True, True, True
----


----
input:
i:False, j:True, k:False

calculations:
(i := j) == k ==> False
True, True, False
***
(i := j) != k ==> True
True, True, False
----


----
input:
i:False, j:True, k:None

calculations:
(i := j) == k ==> False
True, True, None
***
(i := j) != k ==> True
True, True, None
----


----
input:
i:False, j:False, k:True

calculations:
(i := j) == k ==> False
False, False, True
***
(i := j) != k ==> True
False, False, True
----


----
input:
i:False, j:False, k:False

calculations:
(i := j) == k ==> True
False, False, False
***
(i := j) != k ==> False
False, False, False
----


----
input:
i:False, j:False, k:None

calculations:
(i := j) == k ==> False
False, False, None
***
(i := j) != k ==> True
False, False, None
----


----
input:
i:False, j:None, k:True

calculations:
(i := j) == k ==> False
None, None, True
***
(i := j) != k ==> True
None, None, True
----


----
input:
i:False, j:None, k:False

calculations:
(i := j) == k ==> False
None, None, False
***
(i := j) != k ==> True
None, None, False
----


----
input:
i:False, j:None, k:None

calculations:
(i := j) == k ==> True
None, None, None
***
(i := j) != k ==> False
None, None, None
----


----
input:
i:None, j:True, k:True

calculations:
(i := j) == k ==> True
True, True, True
***
(i := j) != k ==> False
True, True, True
----


----
input:
i:None, j:True, k:False

calculations:
(i := j) == k ==> False
True, True, False
***
(i := j) != k ==> True
True, True, False
----


----
input:
i:None, j:True, k:None

calculations:
(i := j) == k ==> False
True, True, None
***
(i := j) != k ==> True
True, True, None
----


----
input:
i:None, j:False, k:True

calculations:
(i := j) == k ==> False
False, False, True
***
(i := j) != k ==> True
False, False, True
----


----
input:
i:None, j:False, k:False

calculations:
(i := j) == k ==> True
False, False, False
***
(i := j) != k ==> False
False, False, False
----


----
input:
i:None, j:False, k:None

calculations:
(i := j) == k ==> False
False, False, None
***
(i := j) != k ==> True
False, False, None
----


----
input:
i:None, j:None, k:True

calculations:
(i := j) == k ==> False
None, None, True
***
(i := j) != k ==> True
None, None, True
----


----
input:
i:None, j:None, k:False

calculations:
(i := j) == k ==> False
None, None, False
***
(i := j) != k ==> True
None, None, False
----


----
input:
i:None, j:None, k:None

calculations:
(i := j) == k ==> True
None, None, None
***
(i := j) != k ==> False
None, None, None
----



The following math exercise involves CSS.
- I  am only working in % scales in the following exercise. 
- Your answer should be equations, formulae and calculations **not css**

I have a grid defined as:

Some useful constants:

k:= percentage of **original** item **width**
r:= apect ratio of item - **fixed**
h:= ratio of column-gap to row-gap

Some variable:
x = (x_prime/k) *100 

- [Note] x_prime is irrelvant but just shows how i define it

Then a css grid containing **identical** items
```css
grid-row-columns:repeat(3,1fr) 
```
- AKA 1/3, 1/3, 1/3

I want to apply a vertical spacing of *x* between rows. 
And a horizontal spacing of **x*h** between the columns.

To me - trivially, the row-gap is:

RowGap(x) = (x/3)%
and the column-gap is:
ColumnGap(x) = (x*h/3)%

I now also want to apply a margin-top of x/2% to the item. I belive applying column-gap applies some scaling to the items. I am unsure whether row-gap does as well.

This would make the margin-top calculation less trivial.

1. What scaling to a fixed aspect ratio item does applying ColumnGap(x) apply to the item.
2. Does RowGap(x) also apply scaling?



I want to arrange a set of flat-topped regular hexagon items into a honeycomb pattern, 
using CSS grid as the base layout. The goal is to introduce a single control variable, 
relative_spacing, which determines the separation between parallel edges of adjacent 
hexagons. From this variable, I compute row gaps and margin translations so that all 
parallel edges of the hexagons remain equally spaced — i.e. the perpendicular distance 
(the normal) between any two neighboring parallel edges is the same. This keeps the 
tiling visually consistent while allowing the overall spacing of the honeycomb to be 
adjusted smoothly.



// const TimelineData = [
// 	{
// 		date: "NOV 2022",
// 		content:
// 			"ChatGPT 3.5 is released - The 'ChatGPT' moment. Prompt Engineering goes mainstream ",
// 	},
// 	{
// 		date: "MAR 2023",
// 		content: "ChatGPT 4 is released",
// 	},
// 	{
// 		date: "DEC 2023",
// 		content:
// 			"AI Compatible is founded and collates 2023s discoveries in prompt engineering into a methodology, to help people use AI effectively and ethically",
// 	},
// 	{
// 		date: "JAN 2024",
// 		content:
// 			"AI Compatible (AIC) runs its first series of prompt engineering training workshops with live clients, using the new methodology. Initially delivered through AIC first partner, The Growth House who offer leadership and teamship corporate training",
// 	},
// 	{
// 		date: "MARCH 2024",
// 		content:
// 			"March - The EU AI act is passed - there's questions around how well suited it is to the world of generative AI, and how stifling it is. Our Founder Joe co-led the 'SafeNet' project for improving online safety and AI literacy among young people in the Balkans, founded by the UN Mission in Kosovo (UNMIK)",
// 	},
// 	{
// 		date: "JUL 2024",
// 		content:
// 			"NotebookLM is released, everyone loves it, go try it now if you haven't",
// 	},
// 	{
// 		date: "SEP 2024",
// 		content:
// 			"Open AI's release of o1 'strawberry', first of the 'reasoning model' generation of generative AI.",
// 	},
// 	{
// 		date: "OCT 2024",
// 		content:
// 			"O3 gets 85% accuracy on the ARC 1 benchmark - this is the going to the moon moment for Foundation models, ARC 1 was THE benchmark to beat. The AI Compatible team grows alongside our roster of partners",
// 	},
// 	{
// 		date: "JAN 2025",
// 		content:
// 			"January 2025, Deepseek R1 matches Open AI's o1 Benchmark performance. After a couple months of working closely with Heward Mills data protection officers and becoming an advisor and partner we add Policy assistance and consultancy to the services we offer.",
// 	},
// 	{
// 		date: "APRIL 2025",
// 		content:
// 			"Open AI O3 high gets 20% on 'Humanity's Last Exam', a compilation of problems that specialised human experts find particularly hard",
// 	},
// ];


dynamically insert p styling, h1,h2 styling h3+styling 