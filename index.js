import { Command } from 'commander';
import inquirer  from 'inquirer';
import fs from 'fs';

const program = new Command();

const questions = [
  {
    type: "input",
    name: 'title',
    message: 'Please enter the cource title: ',
  },
  {
    type: "number",
    name: 'price',
    message: 'Please enter the cource price: '
  },
];

const filePath = './courses.json';

program
  .name('cli-courses')
  .description('Simple CLI to manage courses')
  .version('1.0.0');


program
  .command('add')
  .alias('a')
  .description('Add a course')
  .action(() => {

    inquirer
    .prompt(questions)
    .then((answers) => {
      // if existing
      if(fs.existsSync(filePath)) {
        //read the file 
        fs.readFile(filePath, 'utf8',(err, data)=> {
          if(err) {
            console.log(`Error: ${err}`);
            process.exit();
          }

          // convert to obj na store the old data to a new var...
          const dataAsJson = JSON.parse(data);
          // add the new data to old data
          dataAsJson.push(answers);
          // write the file again with the old data and new data
          fs.writeFile(filePath, JSON.stringify(dataAsJson), 'utf-8', ()=> {
            console.log('Add Course Done.');
          })

        })
      } else {
        // if the file does'nt exist will create the file with that first data..
        fs.writeFile(filePath, JSON.stringify([answers]), 'utf-8', ()=> {
          console.log('Add Course Done.');
        })
      }
    })

  })

program
.command('list')
.alias('l')
.description('Show the list of courses')
.action(()=> {
  fs.readFile(filePath, 'utf-8', (err, data)=> {
    if(err) {
      console.log(`Error ${err}`);
      process.exit();
    }

    console.table(JSON.parse(data));

  })
})

program.parse();

