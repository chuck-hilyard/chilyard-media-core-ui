import Chart from 'chart.js';


Chart.pluginService.register({
  afterUpdate: function (chart) {
    if (chart.config.options.elements.center) {
      var helpers = Chart.helpers;
      var centerConfig = chart.config.options.elements.center;
      var globalConfig = Chart.defaults.global;
      var ctx = chart.chart.ctx;

      var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
      var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);

      ctx.save();
      var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
      var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 50);
      var line1Size = centerConfig.line1Size ? centerConfig.line1Size : getFontSize(centerConfig.line1, centerConfig.line1Padding);
      var line2Size = centerConfig.line2Size ? centerConfig.line2Size : getFontSize(centerConfig.line2, centerConfig.line2Padding);

      // save properties
      chart.center = {
        line1Font: helpers.fontString(line1Size, fontStyle, fontFamily),
        line1Size: line1Size,
        line2Font: helpers.fontString(line2Size, fontStyle, fontFamily),
        line2Size: line2Size,
        fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
      };
    }

    function getFontSize(text, padding) {
      var size = fontSize;
      do {
        ctx.font = helpers.fontString(size, fontStyle, fontFamily);
        var labelWidth = ctx.measureText(text).width;
        size += 1;
      }
      while (labelWidth < (chart.innerRadius * 2 - padding) && size < maxFontSize);
      return size;
    }
  },
  beforeDraw: function (chart) {
    if (chart.center) {
      var ctx = chart.chart.ctx;
      var centerConfig = chart.config.options.elements.center;
      var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      var line1Y = centerConfig.line2 ? centerY - chart.center.line1Size / 3 : centerY;

      ctx.save();
      ctx.fillStyle = chart.center.fillStyle;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.font = chart.center.line1Font;
      ctx.fillText(centerConfig.line1, centerX, line1Y);

      if (centerConfig.line2) {
        ctx.font = chart.center.line2Font;
        ctx.fillText(centerConfig.line2, centerX, centerY + chart.center.line2Size);
      }

      ctx.restore();
    }
  },
});
