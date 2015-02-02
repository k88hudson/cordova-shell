# Chrome - mouse

Click
Click drag on element
- mouseover
- mousedown
- mouseup
- click
Click drag start on element end off
Multiple fast clicks
- mouseover
- mousedown
Click drag start off element end on
- mouseover
- mouseup

## Chrome - simulated touch
Click
Multiple fast clicks
- touchstart
- touchend
- mousedown
- mouseup
- click
Click drag on element
Click drag start on element end off
- touchstart
- touchmove (*32)
- touchend
Click drag start off element end on
- (none)

## Android
Click
- mouseover
- touchstart
- touchend
- mousedown
- mouseup
- click
    //
- touchstart
- touchend
- mousedown
- mouseup
- click
    //
- mouseover
- mousedown
- mouseup
- click
    //
Fast double clicking
- (mouseover - when not focused)
- touchstart
- touchend
- touchstart
- touchend
    //
- touchstart
- touchend
- touchstart
- touchend
- touchstart
- touchend
- mousedown
- mouseup
- click

Click drag on element
Click drag start on element end off
- (mouseover - when not focused)
- touchstart
- touchmove (*10)
- touchend
Click drag start off element end on
- (nothing)


