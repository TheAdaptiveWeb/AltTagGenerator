/**
 *  Copyright 2019 The Adaptive Web. All Rights Reserved.
 * 
 *  Licensed under the Mozilla Public License 2.0 (the "License"). 
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *  
 *      https://www.mozilla.org/en-US/MPL/2.0/
 *  
 *  or in the "license" file accompanying this file. This file is distributed 
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
 *  express or implied. See the License for the specific language governing 
 *  permissions and limitations under the License.
 */

import { AdapterContext, XHROptions } from 'adaptiveweb';

/**
 * Generates a caption for the image
 * @param aw the adapter context
 * @param blob the image blob
 */
export function describeImage(aw: AdapterContext, blob: Blob | null): Promise<string> {
    return aw.request('https://api.adaptiveweb.io/describe', new XHROptions({
        method: 'POST',
        data: blob,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Accept':       'application/json, text/*'
        }
    })).then(res => res.caption);
}