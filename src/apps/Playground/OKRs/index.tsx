import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {Card, Screen, Text} from '../../../components';
import {Theme} from '../../../utils';

export const OKRs = memo(function PlaygroundOKRs() {
  const {goBack} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);
  return (
    <Screen onLeftPress={navBack} title="OKRs">
      <ScrollView
        contentContainerStyle={{paddingHorizontal: Theme.padding.p05}}>
        <Card>
          <Text title="Company" type="h6" />
          <Card>
            <Text title="Mission" type="h6" />
            <Text
              title="We strive to offer our customers the lowest possible prices
        the best available selection and the utmost convenience."
            />
          </Card>
          <Card>
            <Text title="Vision" type="h6" />
            <Text title="To be Earth’s most customer-centric company where customers can find and discover anything they might want to buy online." />
          </Card>
          <Card>
            <Text title="Values" type="h6" />
            <Text title="Customer Obsession" />
            <Text title="Ownership" />
            <Text title="Invent and Simplify" />
            <Text title="Are Right a Lot" />
            <Text title="Learn and Be Curious" />
            <Text title="Hire and Develop the Best" />
            <Text title="Insist on the Highest Standards" />
            <Text title="Think Big" />
            <Text title="Bias for Action" />
            <Text title="Frugality" />
            <Text title="Earn Trust" />
            <Text title="Dive Deep" />
            <Text title="Have Backbone; Disagree and Commit" />
            <Text title="Deliver Results" />
          </Card>
        </Card>
        <Card>
          <Text title="Product" type="h6" />
          <Card>
            <Text title="Vision" type="h6" />
            <Text title="Jim, owner" />
          </Card>

          <Card>
            <Text title="KPIs" type="h6" />
            <Text title="Customer Lifetime Value" />
            <Text title="Average Revenue Per user" />
            <Text title="Customer Aquisition Cost" />
            <Text title="Monthly Recurring Revenue" />
            <Text title="Churn" />
            <Text title="Cost of Sales" />
            <Text title="Contributing Margins" />
          </Card>
          <Card>
            <Text title="Team" type="h6" />
            <Text title="Jim, owner" />
            <Text title="Bob, designer" />
            <Text title="Steve, engineer" />
            <Text title="Greg, engineer" />
          </Card>

          <Card>
            <Text title="Objective" type="h6" />
            <Text title="Jim, owner" />
            <Card>
              <Text title="KeyResult" type="h6" />
              <Text title="Jim, owner" />
            </Card>
            <Card>
              <Text title="KeyResult" type="h6" />
              <Text title="Jim, owner" />
            </Card>
            <Card>
              <Text title="KeyResult" type="h6" />
              <Text title="Jim, owner" />
            </Card>
          </Card>
          <Card>
            <Text title="Objective" type="h6" />
            <Text title="Jim, owner" />
          </Card>
        </Card>
      </ScrollView>
    </Screen>
  );
});
