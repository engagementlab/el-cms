import {
    list
} from '@keystone-6/core';
import {
    relationship,
    text
} from '@keystone-6/core/fields';
import {
    document
} from '@keystone-6/fields-document';
import {
    Lists
} from '.keystone/types';
import path from 'path';
import _ from 'lodash';

import {
    componentBlocks
} from '../../components/component-blocks';
import { FixButtons } from '../hooks';

const BigPicture: Lists.BigPicture = list({
    fields: {
        name: text({
            isIndexed: 'unique',
            isFilterable: true,
            defaultValue: 'Big Picture Page',
            ui: {
                createView: {
                    fieldMode: 'hidden'
                },
                itemView: {
                    fieldMode: 'read'
                }
            }
        }),
        content: document({
            formatting: {
                headingLevels: [3, 4],
                inlineMarks: true,
                listTypes: true,
                alignment: true,
                blockTypes: true,
                softBreaks: true,
            },
            dividers: true,
            links: true,
            layouts: [
                [1, 1],
                [1, 1, 1],
                [2, 1],
                [1, 2],
                [1, 2, 1],
            ],
            ui: {
                views: path.join(process.cwd(), 'admin/components/component-blocks')
            },
            componentBlocks,

            relationships: {
              image: {
                kind: 'prop',
                listKey: 'BigPictureImage',
                selection: 'imageName altText image {publicUrlTransformed publicId}',
              },
            },
            hooks: {
                resolveInput: async ({
                    listKey,
                    fieldKey,
                    operation,
                    inputData,
                    item,
                    resolvedData,
                    context,
                  }) => { 
                      return FixButtons(resolvedData)
                 },
            }
        }),
        images: relationship({
          ref: 'BigPictureImage.bigPictureImages',
          many: true,
          label: "Images (add here for use in 'Content' field)",
          ui: {
            displayMode: 'cards',
            cardFields: ['image', 'imageName', 'altText'],
            inlineCreate: {
              fields: ['image', 'imageName', 'altText']
            },
            inlineEdit: {
              fields: ['image', 'imageName', 'altText']
            },
          },
        }),
    },
    ui: {
        hideCreate: true,
        hideDelete: true,
    },
    // hooks: {
    //     beforeOperation: async ({
    //     listKey,
    //     operation,
    //     inputData,
    //     item,
    //     resolvedData,
    //     context,
    //   }) => {
    //     console.log((inputData.content as object[]).)
    //     if(resolvedData.name) {
  
    //       resolvedData = {
    //         ...resolvedData,
    //       }
  
    //     }
    //     return resolvedData;
    //   }
    // }
  });
  export default BigPicture;