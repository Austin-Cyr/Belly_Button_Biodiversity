function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;

    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
        console.log('samples:', data)  
    var specimen = data.samples;
        console.log('specimen:', specimen)
    var specimenmetadata = data.metadata;
        console.log(specimenmetadata);
    var specimenmetadatafilter = specimenmetadata.filter(sampleObj => sampleObj.id == sample);
        console.log('smf:', specimenmetadatafilter);
    var specimenmdfresult = specimenmetadatafilter[0]
    var washfreq = specimenmdfresult.wfreq;
        console.log('wf:', washfreq);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
      var specimenFiltered = specimen.filter(sampleObj => sampleObj.id == sample);
        console.log('filter:', specimenFiltered)
    //  5. Create a variable that holds the first sample in the array.
      var specimenResult = specimenFiltered[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var specimen_OTU_ids = specimenResult.otu_ids;
        console.log(specimen_OTU_ids)
      var specimen_OTU_labels = specimenResult.otu_labels;
        //console.log(specimen_OTU_labels)
      var specimen_sample_values = specimenResult.sample_values;
        console.log('specimen:', specimen_sample_values.map)
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 


    var yticks = specimen_OTU_ids.slice(0,9).map(otuid => `OTU ${otuid}`);
      console.log(yticks);

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: specimen_sample_values,
      y: yticks,
      type: "bar",
      orientation: 'h',
      //text: specimen_OTU_labels,
    }];
  
    
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout)



// Bubble charts
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: specimen_OTU_ids,
      y: specimen_sample_values,
      text: specimen_OTU_labels,
      mode: 'markers',
      colorscale: 'electric',
      marker: {
        size: specimen_sample_values,
        color: specimen_OTU_ids,
              }
          }];

          // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {
        title: {
          text: "OTU ID"},
        tickangle: -45
      },
      margin: {autoexpand:true},
      hovermode: "closest"
      };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain: { x: [0, 1], y: [0, 1]},
      value: washfreq,
      title: {text: "Belly Button Washing Frequency"},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: {range: [null, 10]},
        bar: {color: "black"},
        steps: [
          {range: [0, 2], color: "blue"},
          {range: [2, 4], color: "green"},
          {range: [4, 6], color: "red"},
          {range: [6, 8], color: "cyan"},
          {range: [8, 10], color: "magenta"}
        ]
      }}];    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500,
      height: 500,
      margin: {t:-100, b:200}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  })
}


