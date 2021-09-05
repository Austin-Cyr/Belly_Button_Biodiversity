// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log('data:', data);

    // Create a variable that holds the samples array. 
    var specimen = data.samples;
    console.log(specimen)
    // Create a variable that filters the samples for the object with the desired sample number.
    var specimenFiltered = specimen.filter(sampleObj => sampleObj.id == sample);
    console.log('filter:', specimenFiltered)
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var specimenmetadata = data.metadata;
        console.log(specimenmetadata);
    var specimenmetadatafilter = specimenmetadata.filter(sampleObj => sampleObj.id == sample);
        console.log(specimenmetadatafilter);
    // Create a variable that holds the first sample in the array.
    var specimenResult = specimenFiltered[0];
    // 2. Create a variable that holds the first sample in the metadata array.
    var firstspecimen = specimenmetadatafilter[0];
        console.log(firstspecimen);

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var specimen_OTU_ids = specimenResult.otu_ids;
    //console.log(specimen_OTU_ids)
    var specimen_OTU_labels = specimenResult.otu_labels;
    //console.log(specimen_OTU_labels)
    var specimen_sample_values = specimenResult.sample_values;
    //console.log('specimen:', specimen_sample_values.map)

    // 3. Create a variable that holds the washing frequency.
    var washfreq = firstspecimen.wfreq;
        console.log('wf:', washfreq);
    
        // Create the yticks for the bar chart.
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
    
    // Use Plotly to plot the bar data and layout.
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"
    };
    Plotly.newPlot("bar", barData, barLayout)
    // Use Plotly to plot the bubble data and layout.
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
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain: { x: [0, 1], y: [0, 1]},
      value: washfreq,
      title: {text: <h3>Belly Button Washing Frequency</h3>},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: {range: [null, 10]},
        bar: {color: "black"},
        steps: [
          {range: [0, 2], color: "b"},
          {range: [2, 4], color: "g"},
          {range: [4, 6], color: "r"},
          {range: [6, 8], color: "c"},
          {range: [8, 10], color: "m"}

        ]
      }}];    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600,
      height: 500,
      margin: {t:0, b:0}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
