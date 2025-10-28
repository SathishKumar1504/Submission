------------------------------------------------------------
-- Create schema: training
------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'training')
BEGIN
    EXEC('CREATE SCHEMA training');
END;
GO

------------------------------------------------------------
-- USERS
------------------------------------------------------------
CREATE TABLE training.users (
    userid INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    phone NVARCHAR(20),
    usertype NVARCHAR(20) CHECK (usertype IN ('normal', 'bankuser')),
    dateofbirth DATE,
    status NVARCHAR(20) DEFAULT 'active',
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME NULL,
    deleted_at DATETIME NULL
);
GO

------------------------------------------------------------
-- ROLES
------------------------------------------------------------
CREATE TABLE training.roles (
    roleid INT IDENTITY(1,1) PRIMARY KEY,
    rolename NVARCHAR(50) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME NULL
);
GO

------------------------------------------------------------
-- PERMISSIONS
------------------------------------------------------------
CREATE TABLE training.permissions (
    permissionid INT IDENTITY(1,1) PRIMARY KEY,
    permissionname NVARCHAR(50) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME NULL
);
GO

------------------------------------------------------------
-- USERROLE
------------------------------------------------------------
CREATE TABLE training.userroles (
    userid INT NOT NULL,
    roleid INT NOT NULL,
    assigned_at DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (userid, roleid),
    FOREIGN KEY (userid) REFERENCES training.users(userid) ON DELETE CASCADE,
    FOREIGN KEY (roleid) REFERENCES training.roles(roleid) ON DELETE CASCADE
);
GO

------------------------------------------------------------
-- ROLEPERMISSION
------------------------------------------------------------
CREATE TABLE training.rolepermissions (
    roleid INT NOT NULL,
    permissionid INT NOT NULL,
    granted_at DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (roleid, permissionid),
    FOREIGN KEY (roleid) REFERENCES training.roles(roleid) ON DELETE CASCADE,
    FOREIGN KEY (permissionid) REFERENCES training.permissions(permissionid) ON DELETE CASCADE
);
GO

------------------------------------------------------------
-- BANKS
------------------------------------------------------------
CREATE TABLE training.banks (
    bankid INT IDENTITY(1,1) PRIMARY KEY,
    bankname NVARCHAR(100) NOT NULL,
    established_year INT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME NULL
);
GO

------------------------------------------------------------
-- BRANCHES
------------------------------------------------------------
CREATE TABLE training.branches (
    branchid INT IDENTITY(1,1) PRIMARY KEY,
    branchname NVARCHAR(100) NOT NULL,
    address NVARCHAR(200),
    bankid INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME NULL,
    FOREIGN KEY (bankid) REFERENCES training.banks(bankid) ON DELETE CASCADE
);
GO

------------------------------------------------------------
-- EMPLOYEES
------------------------------------------------------------
CREATE TABLE training.employees (
    employeeid INT IDENTITY(1,1) PRIMARY KEY,
    userid INT NULL,
    branchid INT NOT NULL,
    roleid INT NULL,
    employeename NVARCHAR(100) NOT NULL,
    designation NVARCHAR(100),
    salary DECIMAL(18,2),
    hiredate DATE DEFAULT GETDATE(),
    status NVARCHAR(20) DEFAULT 'active',
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME NULL,
    terminated_at DATETIME NULL,
    FOREIGN KEY (userid) REFERENCES training.users(userid) ON DELETE SET NULL,
    FOREIGN KEY (branchid) REFERENCES training.branches(branchid) ON DELETE CASCADE,
    FOREIGN KEY (roleid) REFERENCES training.roles(roleid) ON DELETE SET NULL
);
GO

------------------------------------------------------------
-- ACCOUNTS
------------------------------------------------------------
CREATE TABLE training.accounts (
    accountid INT IDENTITY(1,1) PRIMARY KEY,
    accountnumber NVARCHAR(20) NOT NULL UNIQUE,
    accounttype NVARCHAR(20) CHECK (accounttype IN ('saving', 'current', 'termdeposit')),
    balance DECIMAL(18,2) DEFAULT 0,
    currency NVARCHAR(10) DEFAULT 'inr',
    isminor BIT DEFAULT 0,
    ispoa BIT DEFAULT 0,
    status NVARCHAR(20) DEFAULT 'active',
    userid INT NOT NULL,
    branchid INT NOT NULL,
    createddate DATETIME DEFAULT GETDATE(),
    lasttransactiondate DATETIME NULL,
    closeddate DATETIME NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME NULL,
    FOREIGN KEY (userid) REFERENCES training.users(userid) ON DELETE CASCADE,
    FOREIGN KEY (branchid) REFERENCES training.branches(branchid) ON DELETE CASCADE
);
GO

------------------------------------------------------------
-- TERM DEPOSIT ACCOUNTS
------------------------------------------------------------
CREATE TABLE training.termdeposits (
    termdepositid INT IDENTITY(1,1) PRIMARY KEY,
    accountid INT NOT NULL UNIQUE,
    principalamount DECIMAL(18,2) NOT NULL,
    interestrate DECIMAL(5,2) NOT NULL,
    startdate DATE NOT NULL,
    maturitydate DATE NOT NULL,
    closeddate DATE NULL,
    linkedaccountid INT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME NULL,
    FOREIGN KEY (accountid) REFERENCES training.accounts(accountid) ON DELETE CASCADE,
    FOREIGN KEY (linkedaccountid) REFERENCES training.accounts(accountid)
);
GO

------------------------------------------------------------
-- POWER OF ATTORNEY (POA)
------------------------------------------------------------
CREATE TABLE training.poa (
    poaid INT IDENTITY(1,1) PRIMARY KEY,
    accountid INT NOT NULL,
    grantedto INT NOT NULL,
    validfrom DATE NOT NULL DEFAULT GETDATE(),
    validto DATE NULL,
    status NVARCHAR(20) DEFAULT 'active',
    created_at DATETIME DEFAULT GETDATE(),
    revoked_at DATETIME NULL,
    FOREIGN KEY (accountid) REFERENCES training.accounts(accountid) ON DELETE CASCADE,
    FOREIGN KEY (grantedto) REFERENCES training.users(userid)
);
GO

------------------------------------------------------------
-- MINOR GUARDIANS
------------------------------------------------------------
CREATE TABLE training.minorguardians (
    guardianid INT IDENTITY(1,1) PRIMARY KEY,
    minoruserid INT NOT NULL,
    guardianuserid INT NOT NULL,
    relation NVARCHAR(50),
    assigned_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME NULL,
    FOREIGN KEY (minoruserid) REFERENCES training.users(userid) ON DELETE CASCADE,
    FOREIGN KEY (guardianuserid) REFERENCES training.users(userid)
);
GO

------------------------------------------------------------
-- TRANSACTIONS
------------------------------------------------------------
CREATE TABLE training.transactions (
    transactionid INT IDENTITY(1,1) PRIMARY KEY,
    accountid INT NOT NULL,
    transactiontype NVARCHAR(20) CHECK (transactiontype IN ('deposit', 'withdraw')),
    amount DECIMAL(18,2) NOT NULL,
    transdate DATETIME DEFAULT GETDATE(),
    performedby INT NULL,
    approvedby INT NULL,
    remarks NVARCHAR(255),
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME NULL,
    FOREIGN KEY (accountid) REFERENCES training.accounts(accountid) ON DELETE CASCADE,
    FOREIGN KEY (performedby) REFERENCES training.users(userid),
    FOREIGN KEY (approvedby) REFERENCES training.employees(employeeid)
);
GO
