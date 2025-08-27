


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

