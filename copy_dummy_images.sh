#!/bin/bash
SRC="/home/dell/Downloads/Titan oem frontend (1)/clone-web/Titan-OEM/public/micromotor/image.png"
DEST="uploads/products"
CAT_DEST="uploads/categories"

# Products
for file in quartz-6130.png quartz-6120.png quartz-7121.png quartz-7320.png quartz-7c01.png mechanical-7a20s.png mechanical-7ac0.png mechanical-7a21.png mechanical-7a28.png micromotors-602a.png micromotors-602h-a.png micromotors-901-a.png micromotors-902-a.png micromotors-t922-a.png micromotors-ts102-a.png micromotors-ts102-b.png micromotors-c3h.png
do
  cp "$SRC" "$DEST/$file"
done

# Categories
for file in quartz.png mechanical.png micromotors.png
do
  cp "$SRC" "$CAT_DEST/$file"
done
