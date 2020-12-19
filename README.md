# ae-mask-exporter
 Export complex mask setups of a single layer

## Script Interface
<img src="https://i.imgur.com/FH8fCN3.png" />
-Input Preset File Name
-Location Selection (will remember)
-Export file to desired location

## Use Case
<img src="https://i.imgur.com/7djXIlB.png" />
The primary use for this script is to take auto-traced elements of any complexity, and export them to a format we can later use an importer to recreate! 

## Output Format
<img src="https://i.imgur.com/DKT4iG0.png" />
The format of the output file is essentially just a JSON object, under a custom file extension (.meo), or Mask Export Object. Files are generally a few MB depending on the number of keyframes