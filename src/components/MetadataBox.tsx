import { Text, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';

import metadata from '../abi/parsedData.json';
import rates from '../abi/nftRates.json';

const MetadataBox: FC<{index: any}> = ({ index }) => {
    const findIndex = (data: any, index: any) => {
      const dataList: any = data.find((dataList: any) => dataList.index === index);
      return dataList && dataList.index;
    }
    const data = findIndex(metadata, index);

    return(<Grid templateColumns='repeat(2, 1fr)' gap={4}>
            <GridItem display={"flex"} flexDirection={"row"}>
              <Text color={"white"}>Background: </Text>
              <Text color={"white"} marginStart={"1em"}>{metadata[data]['Background']}</Text>
            </GridItem>
            <GridItem display={"flex"} flexDirection={"row"}>
              <Text color={"white"}>Rate:</Text>
              <Text color={"white"} marginStart={"1em"}>{(rates['Background'][metadata[data]['Background'] as keyof typeof rates['Background']] * 100 / 3333).toFixed(2)}%</Text>
            </GridItem>
            <GridItem display={"flex"} flexDirection={"row"}>
              <Text color={"white"}>Fur: </Text>
              <Text color={"white"} marginStart={"1em"}>{metadata[data]['Fur']}</Text>
            </GridItem>
            <GridItem display={"flex"} flexDirection={"row"}>
              <Text color={"white"}>Rate:</Text>
              <Text color={"white"} marginStart={"1em"}>{(rates['Fur'][metadata[data]['Fur'] as keyof typeof rates['Fur']] * 100 / 3333).toFixed(2)}%</Text>
            </GridItem>
            <GridItem display={"flex"} flexDirection={"row"}>
              <Text color={"white"}>Base: </Text>
              <Text color={"white"} marginStart={"1em"}>{metadata[data]['Base']}</Text>
            </GridItem>
            <GridItem display={"flex"} flexDirection={"row"}>
              <Text color={"white"}>Rate:</Text>
              <Text color={"white"} marginStart={"1em"}>{(rates['Base'][metadata[data]['Base'] as keyof typeof rates['Base']] * 100 / 3333).toFixed(2)}%</Text>
            </GridItem>
            <GridItem display={"flex"} flexDirection={"row"}>
              <Text color={"white"}>Injuries: </Text>
              <Text color={"white"} marginStart={"1em"}>{metadata[data]['Hair-Hats']}</Text>
            </GridItem>
            <GridItem display={"flex"} flexDirection={"row"}>
              <Text color={"white"}>Rate:</Text>
              <Text color={"white"} marginStart={"1em"}>{(rates['Hair-Hats'][metadata[data]['Hair-Hats'] as keyof typeof rates['Hair-Hats']] * 100 / 3333).toFixed(2)}%</Text>
            </GridItem>
            <GridItem display={"flex"} flexDirection={"row"}>
              <Text color={"white"}>Injuries: </Text>
              <Text color={"white"} marginStart={"1em"}>{metadata[data]['Injuries']}</Text>
            </GridItem>
            <GridItem display={"flex"} flexDirection={"row"}>
              <Text color={"white"}>Rate:</Text>
              <Text color={"white"} marginStart={"1em"}>{(rates['Injuries'][metadata[data]['Injuries'] as keyof typeof rates['Injuries']] * 100 / 3333).toFixed(2)}%</Text>
            </GridItem>
            <GridItem display={"flex"} flexDirection={"row"}>
              <Text color={"white"}>Mouth: </Text>
              <Text color={"white"} marginStart={"1em"}>{metadata[data]['Mouth']}</Text>
            </GridItem>
            <GridItem display={"flex"} flexDirection={"row"}>
              <Text color={"white"}>Rate:</Text>
              <Text color={"white"} marginStart={"1em"}>{(rates['Mouth'][metadata[data]['Mouth'] as keyof typeof rates['Mouth']] * 100 / 3333).toFixed(2)}%</Text>
            </GridItem>
          </Grid>);
}

export default MetadataBox;
