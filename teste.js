// const readTalkerFile = JSON.parse(fs.readFileSync(TALKER_FILE, 'utf-8'));
//   const { params: { talkerId }, body: { name, age, talk } } = req;

//   const EditedTalker = { name, age, talk, id: +(talkerId) };
//   readTalkerFile.splice(+(talkerId) - 1, 1, EditedTalker);

//   fs.writeFileSync('./talker.json', JSON.stringify(readTalkerFile));
//   return res.status(HTTP_OK_STATUS).send(EditedTalker);