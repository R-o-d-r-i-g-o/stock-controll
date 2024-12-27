import React from 'react';
import InfoIcon from '@mui/icons-material/InfoOutlined';

import * as src from '@/services'
import { defaultDateMask } from '@/common';
import moment from 'moment';

const InfoButton = async () => {
  const appData = await src.fetchHealthData();

  return (
    <div className="relative">
      <div className="fixed bottom-5 left-5 group">
        <div className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-lg group-hover:rounded-r-none">
          <InfoIcon className="text-black" />
        </div>
        <div className="absolute left-12 bottom-0 text-sm w-48 p-3 text-center space-y-2 bg-white rounded-lg rounded-es-none shadow-lg transform origin-bottom-left opacity-0 group-hover:opacity-100">
          <p>
            <strong>Versão:</strong>
            {appData.version}
          </p>
          <p>
            <strong>Banco de dados:</strong>
            {appData.database ? "🟢 Ok" : "🔴 Down"}
          </p>
          <p>
            <strong>Última Atualização:</strong>
            {moment(appData.last_build).format(defaultDateMask)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoButton;
