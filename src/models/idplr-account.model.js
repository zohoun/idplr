// idplrAccount-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'idplrAccount';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    fakeEmail: { type: String, required: true },
    userName:{ type: String  },
    firstName:{ type: String  },
    lastName:{ type: String  },
    password:{ type: String  },
    adresseMacConnection:{ type: String  },
    port:{ type: Number  },
    lastConnexion:{type:Date},
    isConnectedToday:{type:Boolean, default: false},
    isCreated:{ type: Boolean, default: false },
    isRefused:{ type: Boolean, default: false },
    isValidate:{ type: Boolean, default: false },
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
