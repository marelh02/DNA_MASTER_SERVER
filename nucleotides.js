const fs = require('fs');

// Create an array of DNA nucleotides
const nucleotides = ['A', 'C', 'G', 'T'];

// Generate a random DNA string of length 300
let dna = '';
for (let i = 0; i < 300; i++) {
  dna += nucleotides[Math.floor(Math.random() * nucleotides.length)];
}

// Write the DNA string to a text file
fs.writeFile('dna.txt', dna, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('DNA string saved to dna.txt');
});