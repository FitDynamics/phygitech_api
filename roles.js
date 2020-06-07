const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
    ac.grant("student")
        .readOwn("student")
        .updateOwn("student")
        .readOwn("meeting")

    ac.grant("teacher")
        .extend("student")
        .updateOwn("meeting")
        .readOwn("teacher")
        .updateOwn("teacher")

    ac.grant("branch-admin")
        .extend("teacher")
        .createAny("meeting")
        .updateAny("teacher")
        .deleteAny("teacher")
        .updateAny("student")
        .deleteAny("student")

    ac.grant("super-admin")
        .extend("branch-admin")
        .readOwn("admin")
        .readAny("admin")
        .updateAny("admin")
        .deleteAny("admin")


    return ac;
})();