/*
 * Copyright (C) 2017 Alasdair Mercer, !ninja
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

const debug = require('debug')('brander:task:clean');
const path = require('path');
const rimraf = require('rimraf');
const util = require('util');

const Task = require('../task');
const TaskType = require('../task-type');

const removeFile = util.promisify(rimraf);

/**
 * TODO: document
 *
 * @public
 */
class CleanAnyTask extends Task {

  /**
   * @inheritdoc
   * @override
   */
  getType() {
    return TaskType.CLEAN;
  }

  /**
   * @inheritdoc
   * @override
   */
  async execute(context) {
    for (const inputFile of context.inputFiles) {
      const inputFilePath = path.resolve(inputFile.dir, inputFile.name);

      debug('Removing file: %s', inputFilePath);

      await removeFile(inputFilePath, { glob: false });
    }
  }

  /**
   * @inheritdoc
   * @override
   */
  supports(context) {
    return true;
  }

}

module.exports = CleanAnyTask;
