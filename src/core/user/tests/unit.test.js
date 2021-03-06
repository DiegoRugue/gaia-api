const faker = require('faker');
const { createUser } = require('./helper');
const UserService = require('../service');
const UserRepository = require('../repository');
const UserScope = require('../scope');

jest.mock('../repository');

describe('Unit user test', () => {
  it('Should be admin for register users', async () => {
    const user = createUser();

    UserRepository.create.mockImplementationOnce((user) => {
      return user;
    });

    UserRepository.verifyAdmin.mockImplementationOnce(() => {
      return false;
    });

    try {
      await UserService.create(user, 1);
    } catch (err) {
      expect(err.message).toBe('Only the owner or administrator user has access to this feature');
      expect(err.code).toBe(401);
    }
  });

  it('Should be user already exists', async () => {
    const user = createUser();

    UserRepository.getByEmail.mockImplementationOnce(() => {
      return user;
    });

    UserRepository.verifyAdmin.mockImplementationOnce(() => {
      return true;
    });

    try {
      await UserService.create(user);
    } catch (err) {
      expect(err.message).toBe('User already exists');
      expect(err.code).toBe(409);
    }
  });

  it('Should be User recently deleted', async () => {
    const user = createUser();

    UserRepository.getById.mockImplementationOnce(() => {
      return false;
    });

    try {
      await UserService.update(user);
    } catch (err) {
      expect(err.message).toBe('User recently deleted');
      expect(err.code).toBe(400);
    }
  });

  it("Should be Password doesn't match", async () => {
    const user = createUser();
    user.oldPassword = faker.internet.password();

    UserRepository.getById.mockImplementationOnce(() => {
      return {
        checkPassword() { return false }
      };
    });

    UserRepository.verifyAdmin.mockImplementationOnce(() => {
      return {
        checkPassword() { return true }
      };
    });

    try {
      await UserService.update(user);
    } catch (err) {
      expect(err.message).toBe("Password doesn't match");
      expect(err.code).toBe(400);
    }
  });

  it("Should be Email already exists try another one", async () => {
    const user = createUser();
    user.oldPassword = faker.internet.password();

    UserRepository.getById.mockImplementationOnce(() => {
      return {
        email: 'teste@teste.com',
        checkPassword() { return true }
      };
    });

    UserRepository.verifyAdmin.mockImplementationOnce(() => {
      return {
        checkPassword() { return true }
      };
    });

    UserRepository.getByEmail.mockImplementationOnce(email => {
      return {
        email,
      }
    });

    try {
      await UserService.update(user);
    } catch (err) {
      expect(err.message).toBe("Email already exists try another one");
      expect(err.code).toBe(400);
    }
  });

  it('Should be user validated', async () => {
    try {
      await UserScope.create({
        name: faker.name.findName(),
        email: faker.internet.email()
      });
    } catch (err) {
      expect(err.message).toBe('password is a required field');
      expect(err.code).toBe(400);
    }
  });
});
