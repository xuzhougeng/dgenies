if (!d3 || !d3.boxplot) {
    throw "d3.boxplot wasn't included!"
}
d3.boxplot.events = {};

d3.boxplot.events.init = function () {
    $("input#filter_size").change(function() {
        d3.boxplot.events.filter_size(d3.boxplot.min_sizes[this.value]);
    });
    $("input#stroke-linecap").change(function() {
        d3.boxplot.events.stroke_linecap(!this.checked);
    });
    $("input#stroke-width").change(function() {
        d3.boxplot.events.stroke_width(this.value);
    });
    $("input#filter_identity").change(function() {
        d3.boxplot.events.filter_identity(this.value);
    });
    $("input#chroms-limits").change(function() {
        d3.boxplot.events.set_break_lines_visibility(this.value);
    })
};

d3.boxplot.events.set_break_lines_visibility = function(value) {
    if (value === "0") {
        d3.boxplot.break_lines_show = false;
        d3.boxplot.break_lines_dash = "3, 3";
    }
    else if (value === "1") {
        d3.boxplot.break_lines_show = true;
        d3.boxplot.break_lines_width = d3.boxplot.scale / 2000;
        d3.boxplot.break_lines_color = "#bfbfbf";
        d3.boxplot.break_lines_dash = "3, 3";
    }
    else if (value === "2") {
        d3.boxplot.break_lines_show = true;
        d3.boxplot.break_lines_width = d3.boxplot.scale / 1500;
        d3.boxplot.break_lines_color = "#7c7c7c";
        d3.boxplot.break_lines_dash = "3, 3";
    }
    else if (value === "3") {
        d3.boxplot.break_lines_show = true;
        d3.boxplot.break_lines_width = d3.boxplot.scale / 1000;
        d3.boxplot.break_lines_color = "#424242";
        d3.boxplot.break_lines_dash = "3, 3";
    }
    else if (value === "4") {
        d3.boxplot.break_lines_show = true;
        d3.boxplot.break_lines_width = d3.boxplot.scale / 800;
        d3.boxplot.break_lines_color = "#2b2b2b";
        d3.boxplot.break_lines_dash = "3, 3";
    }
    else if (value === "5") {
        d3.boxplot.break_lines_show = true;
        d3.boxplot.break_lines_width = d3.boxplot.scale / 600;
        d3.boxplot.break_lines_color = "#000000";
        d3.boxplot.break_lines_dash = "none";
    }

    if (d3.boxplot.break_lines_show) {
        d3.selectAll("line.break-lines").style("visibility", "visible");
        d3.selectAll("line.break-lines").attr("stroke-width",
            d3.boxplot.break_lines_width / d3.boxplot.zoom_scale_lines);
        d3.selectAll("line.break-lines").attr("stroke", d3.boxplot.break_lines_color);
        d3.selectAll("line.break-lines").style("stroke-dasharray", d3.boxplot.break_lines_dash);
    }
    else {
        d3.selectAll("line.break-lines").style("visibility", "hidden");
    }
};

d3.boxplot.events.filter_size = function(min_size) {
    for(let i=0; i<d3.boxplot.min_sizes.length; i++) {
        let size = d3.boxplot.min_sizes[i];
        if (size < min_size) {
            $("path.content-lines.s_" + size.toString().replace(".", "_")).hide();
        }
        else {
            $("path.content-lines.s_" + size.toString().replace(".", "_")).show();
        }
    }
    d3.boxplot.min_size = min_size
};

d3.boxplot.events.filter_identity = function (min_idy) {
    d3.boxplot.min_idy_draw = min_idy;
    dgenies.show_loading();
    window.setTimeout(() => {
        d3.boxplot.draw_lines();
        d3.selectAll("path.content-lines").attr("stroke-width",
            d3.boxplot.content_lines_width / d3.boxplot.zoom_scale_lines);
        d3.boxplot.events.filter_size(d3.boxplot.min_size);
        dgenies.hide_loading();
    }, 0);
};

d3.boxplot.events.stroke_linecap = function(rounded) {
    d3.boxplot.linecap = rounded ? "round" : "butt";
    $("path").attr("stroke-linecap", d3.boxplot.linecap);
};

d3.boxplot.events.stroke_width = function (width) {
    console.log(width);
    let stroke_width = d3.boxplot.scale / 600;
    if (width === "1") {
        stroke_width = d3.boxplot.scale / 400;
    }
    else if (width === "2") {
        stroke_width = d3.boxplot.scale / 200;
    }
    else if (width === "3") {
        stroke_width = d3.boxplot.scale / 100;
    }
    console.log(stroke_width);
    d3.boxplot.content_lines_width = stroke_width;
    d3.selectAll("path.content-lines").attr("stroke-width", stroke_width / d3.boxplot.zoom_scale_lines);
};