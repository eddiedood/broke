// Copyright 2021 Google LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     https://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * A simple component that uses the Looker SDK through the extension sdk to display a customized hello message.
 */

import React, { useEffect, useState, useContext } from 'react';
import { Space, ComponentsProvider } from '@looker/components';
import { ExtensionContext } from '@looker/extension-sdk-react';

export const HelloWorld = () => {
  const { core40SDK } = useContext(ExtensionContext);
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const initialize = async () => {
      try {
        const value = await core40SDK.ok(core40SDK.me());
        setDisplayName(`Hello, ${value.display_name}!`);
        setMessage("We believe that Jaime is the best");
      } catch (error) {
        setDisplayName('Hello!');
        setMessage('Error occurred getting information about me!');
        console.error(error);
      }
    };
    initialize();
  }, []);

  return (
    <ComponentsProvider>
      <div className="header">
        <img src="https://www.musicconnection.com/wp-content/uploads/2022/09/unnamed-2022-09-23T105833.081.png" alt="Broke Logo" className="logo" />
      </div>
      <Space around className="helloWorldBackground">
        <h2>{displayName}</h2>
        <p>{message}</p>
      </Space>
    </ComponentsProvider>
  );
};