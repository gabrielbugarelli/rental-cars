import { inject } from "tsyringe";
import { IUsersRepository } from "../../respositories/contracts/IUsersRepository";

import { deleteFile } from '../../../../utils/file';

type IRequest = {
  user_id: string;
  avatar_file: string;
}

export class UpdateUserAvatarUseCase {
  private usersRepository: IUsersRepository;

  constructor( @inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({user_id, avatar_file}: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if(user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }
    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}