import React, { useState } from 'react';
import GroupDialog from './GroupDialog';
import { inject, observer } from 'mobx-react';
import { UiStateStore } from '../../store/uiStateStore';
import { generateGroupName } from '../../utils/group.utils';
import { SignalrStore } from '../../store/signalrStore';

interface Props {
  uiStateStore?: UiStateStore;
  signalrStore?: SignalrStore;
}

export interface IGroupForm {
  name: string;
  password: string;
}

const CreateGroupDialogContainer: React.FC<Props> = ({
  uiStateStore,
  signalrStore
}: Props) => {
  const initialValues: IGroupForm = {
    name: generateGroupName(),
    password: ''
  };

  const onSubmit = (group: IGroupForm) => {
    signalrStore!.joinGroup(group.name);
  };

  return (
    <GroupDialog
      show={uiStateStore!.groupDialogOpen}
      groupExists={uiStateStore!.groupExists}
      dialogType={uiStateStore!.groupDialogType}
      initialValues={initialValues}
      onClose={() => uiStateStore!.setGroupDialogOpen(false)}
      onSubmit={(group: IGroupForm) => onSubmit(group)}
    />
  );
};

export default inject('uiStateStore', 'signalrStore')(observer(CreateGroupDialogContainer));
