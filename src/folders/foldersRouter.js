const express = require('express');
const foldersRouter = express.Router();
const foldersService = require('./foldersService');
const jsonParser = express.json();
const path = require('path');
const logger = require('../logger');



foldersRouter
  .route('/')
  .get((req, res, next) => {
    foldersService.getAllFolders(req.app.get('db'))
      .then(folder => 
        res.json(folder.map(foldersService.serializeFolder))
      )
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {folder_name} = req.body;
    const newFolder = { folder_name };
    foldersService.insertFolder(
      req.app.get('db'),
      newFolder
    )
      .then(folder => {
        logger.info(`Folder with id ${folder.id} created`);
        res
          .status(201)
          .location(path.posix.join(req.originalUrl + `/${folder.id}`))
          .json(foldersService.serializeFolder(folder));
      })
      .catch(next);
  });

foldersRouter
  .route('/:id')
  .get((req, res) => {
    res.json(foldersService.serializeFolder(res.folder));
  });

module.exports = foldersRouter;