function() {
   this.label = "bulb";
   this.light = 0;
   this.onSwipe = function(dx, dy) {
      switch (pieMenuIndex(dx, dy)) {
      case 0:
         this.setColorId((this.colorId + 1) % palette.length);
         break;
      case 1:
         this.light = 1;
         break;
      case 2:
         this.setColorId((this.colorId + palette.length - 1) % palette.length);
         break;
      case 3:
         this.light = 0;
         break;
      }
   }
   this.render = function(elapsed) {
      var light = this.getInValue(0, this.light);

      var C = [[-.5,-1.6],[-.55,-1],[-.7,-.7],[-.95,0],[-.7,.7],
               [0,1],
               [.7,.7],[.95,0],[.7,-.7],[.55,-1],[.5,-1.6]];

      var A = [
	    [-.3,-2.2],[-.45,-2.2],
	    [-.5,-2.15],[-.5,-2.05],[-.45,-2.0],
	    [-.5,-1.95],[-.5,-1.85],[-.45,-1.8],
	    [-.5,-1.75],[-.5,-1.65],[-.45,-1.6],
         ];

       var B = [
            [.45,-1.6],[.5,-1.65],[.5,-1.75],
            [.45,-1.8],[.5,-1.85],[.5,-1.95],
            [.45,-2.0],[.5,-2.05],[.5,-2.15],
            [.45,-2.2],[.3,-2.2],
         ];

      mCurve(A.concat(makeSpline(C).concat(B)));

      this.afterSketch(function() {
         color(scrimColor(mix(.25, 1, light), this.colorId));
         mFillCurve(makeSpline(C));
         color(palette[this.colorId]);
      });
      color(defaultPenColor);
      lineWidth(1);
      mCurve(makeOval(-.3,-2.5,.6,.6,10,2*PI,PI));
      this.setOutPortValue(light);
   }
}
