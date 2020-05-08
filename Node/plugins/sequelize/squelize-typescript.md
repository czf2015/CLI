# sequelize-typescript

> reference:
- [github](https://github.com/RobinBuschmann/sequelize-typescript)
- [API Reference](https://sequelize.org/master/identifiers)


## tutorial

### [v5]https://github.com/RobinBuschmann/sequelize-typescript)

 - [Installation](https://github.com/RobinBuschmann/sequelize-typescript#installation)
 - [Upgrade to `sequelize-typescript@1`](https://github.com/RobinBuschmann/sequelize-typescript##upgrade-to-sequelize-typescript1)
 - [Model Definition](https://github.com/RobinBuschmann/sequelize-typescript##model-definition)
   - [`@Table` API](https://github.com/RobinBuschmann/sequelize-typescript##table-api)
   - [`@Column` API](https://github.com/RobinBuschmann/sequelize-typescript##column-api)
 - [Usage](https://github.com/RobinBuschmann/sequelize-typescript##usage)
   - [Configuration](https://github.com/RobinBuschmann/sequelize-typescript##configuration)
   - [globs](https://github.com/RobinBuschmann/sequelize-typescript##globs)
   - [Model-path resolving](https://github.com/RobinBuschmann/sequelize-typescript##model-path-resolving)
 - [Model association](https://github.com/RobinBuschmann/sequelize-typescript##model-association)
   - [One-to-many](https://github.com/RobinBuschmann/sequelize-typescript##one-to-many)
   - [Many-to-many](https://github.com/RobinBuschmann/sequelize-typescript##many-to-many)
   - [One-to-one](https://github.com/RobinBuschmann/sequelize-typescript##one-to-one)
   - [`@ForeignKey`, `@BelongsTo`, `@HasMany`, `@HasOne`, `@BelongsToMany` API](https://github.com/RobinBuschmann/sequelize-typescript##foreignkey-belongsto-hasmany-hasone-belongstomany-api)
   - [Generated getter and setter](https://github.com/RobinBuschmann/sequelize-typescript##type-safe-usage-of-auto-generated-functions)
   - [Multiple relations of same models](https://github.com/RobinBuschmann/sequelize-typescript##multiple-relations-of-same-models)
 - [Repository mode](https://github.com/RobinBuschmann/sequelize-typescript##repository-mode)
   - [How to enable repository mode?](https://github.com/RobinBuschmann/sequelize-typescript##how-to-enable-repository-mode)
   - [How to use repository mode?](https://github.com/RobinBuschmann/sequelize-typescript##how-to-use-repository-mode)
   - [How to use associations with repository mode?](https://github.com/RobinBuschmann/sequelize-typescript##how-to-use-associations-with-repository-mode)
   - [Limitations of repository mode](https://github.com/RobinBuschmann/sequelize-typescript##limitations-of-repository-mode)
 - [Model validation](https://github.com/RobinBuschmann/sequelize-typescript##model-validation)
 - [Scopes](https://github.com/RobinBuschmann/sequelize-typescript##scopes)
 - [Hooks](https://github.com/RobinBuschmann/sequelize-typescript##hooks)
 - [Why `() => Model`?](https://github.com/RobinBuschmann/sequelize-typescript##user-content-why---model)
 - [Recommendations and limitations](https://github.com/RobinBuschmann/sequelize-typescript##recommendations-and-limitations)