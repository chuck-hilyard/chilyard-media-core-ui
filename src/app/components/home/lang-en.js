export default {
  home: {
    title: 'Dashboard',
    socialDashboard: 'Social Dashboard',
    searchDashboard: 'Search Dashboard'
  },
  socialDashboard: {
    platform: 'Platform',
    fbSpecialist: 'FB Specialist',
    channel: 'Channel',
    offerName: 'Offer Name',
    dmc: 'DMC',
    socialDashboard: 'Social Dashboard',
    references: 'References:',
    socialDashboardLogic: 'Social Dashboard Logic',
    firstCycle: 'First Cycle',
    secondCycle: 'Second Cycle',
    tableHeader: {
      CID: 'CID',
      campaignName: 'Campaign Name',
      priority: 'Priority',
      budget: 'Budget',
      csScore: 'Clt. Set. Score',
      performance: 'Performance',
      CPL: 'CPL',
      CPM: 'CPM',
      CPC: 'CPC',
      adChange: 'Ad Change',
      relevance: 'Relevance',
      frequency: 'Frequency',
      cpmTrend: 'CPM Trend',
      ctrTrend: 'CTR Trend',
      utilization: 'Utilization',
      CTR: 'CTR',
      lastCltCall: 'Last Clt. Call',
      lastDaySpend: 'Last Day Spend',
      reviewed: 'Reviewed'
    },
    popovers: {
      budget: {
        title: 'Budget',
        description: 'Current budget of the campaign'
      },
      CID: {
        title: 'CID',
        description: 'Campaign ID'
      },
      cltSetScore: {
        title: 'Clt. Set. Score',
        description: 'Client Sentiment Score is an indicator of how the client feels about their campaign on a scale from 1-3, where 1 is poor and 3 is good. ME inputs this value into Salesforce as Client Disposition Score when logging a call with the client, and the most recent value logged is used for the alert.'
      },
      CPC: {
        title: 'CPC',
        description: 'Cost Per Click',
        redDesc: 'CPC >= $3 or (CPC is not available and DaysRunning >= 7) = Red',
        yellowDesc: 'Else Yellow',
        greenDesc: 'CPC < $2 = Green'
      },
      CTR: {
        title: 'CTR',
        description: 'Click-through Rate',
        redDesc: '(CTR < 0.5%) or (CTR is not set) = Red',
        yellowDesc: 'Else Yellow',
        greenDesc: '(CTR > 1%) = Green'
      },
      ctrTrend: {
        title: 'CTR Trend',
        description: 'Reflects the Click-through Rate trending over the last two weeks.',
        redDesc: 'CTR Alert is "Significantly Worse or Moderately Worse" and DaysRunning >= 14 = Red',
        yellowDesc: 'CTR Alert is "Worse or Insuficient Data" and DaysRunning >= 14 = Yellow',
        greenDesc: 'Else Green',
        grayDesc: 'If campaign is not running at least 14 days then indicator will be Gray'
      },
      CPM: {
        title: 'CPM',
        description: 'Cost Per Thousand',
        redDesc: '(CPM > $25) or (CPM is not set) = Red',
        yellowDesc: 'Else Yellow',
        greenDesc: '(CPM <= $20) = Green'
      },
      cpmTrend: {
        title: 'CPM Trend',
        description: 'Reflects the Cost Per Thousand trending over the last two weeks.',
        redDesc: 'CPM Alert is "Significantly Worse or Moderately Worse" and DaysRunning >= 14 = Red',
        yellowDesc: 'CPM Alert is "Worse or Insuficient Data" and DaysRunning >= 14 = Yellow',
        greenDesc: 'Else Green',
        grayDesc: 'If campaign is not running at least 14 days then indicator will be Gray'
      },
      performance: {
        title: 'Performance',
        description: 'This is a relative metric we use in order to rank campaigns by priority. It is an internal-only metric that should not be communicated to clients or DMCs because it is only relevant to our internal ranking and not a standard, industry-recognized metric.',
        firstSection: 'The overall performance of a campaign is calculated by comparing the weighted mean of the contributing performance factor scores against the points possible.',
        secondSection: 'Weighted Mean = (CPM*20%) + (CTR*20%) + (Utilization*20%) + (CPM Trend*15%) + (CTR Trend*10%) + (Ad Modified*10%) + (Relevance*5%)',
        thirdSection: 'Points Possible = 3 Performance Score = Weighted Mean / Points Possible',
        redDesc: 'Poor(<=1.7) = Red',
        yellowDesc: 'Average(>=1.8 to <=2.3) = Yellow',
        greenDesc: 'Good(>=2.4) = Green'
      },
      priority: {
        title: 'Priority',
        description: 'The order of priority in which the campaign should be reviewed. The rank or, "priority," of each campaign is determined by the budget size and the overall performance score, so that the higher the budget and the lower the performance score, the higher the rank is. Priority = budget / (performance*sentiment)'
      },
      utilization: {
        title: 'Utilization',
        redDesc: 'Else Red',
        yellowDesc: '(Budget Utilization between 65% and 80% or Budget Utilization between 120% AND 135%) = Yellow',
        greenDesc: 'Budget Utilization between 80% and 120% and DaysRunning >= 7 = Green'
      },
      adChange: {
        title: 'Ad Change',
        description: 'Reflects how long ago the creative/ad was refreshed.',
        redDesc: '(Last Modified is NULL and days running > 25) or Last Modified > 34 days = Red',
        yellowDesc: 'Else Yellow',
        greenDesc: 'Last Modified < 25 days = Green'
      },
      relevance: {
        title: 'Relevance',
        description: 'Relevance score from Facebook, summarized at campaign level to help indicate potential issues.',
        redDesc: 'Relevance Score < 4 = Red',
        yellowDesc: 'Else Yellow',
        greenDesc: 'Relevance Score > 6 = Green'
      },
      frequency: {
        title: 'Frequency',
        description: 'The average number of times your ad was served to each person, summarized at campaign level to help indicate potential issues.',
        redDesc: 'Frequency (>=7) = Red',
        yellowDesc: 'Frequency (5-6) = Yellow',
        greenDesc: 'Frequency (0-4) = Green',
        grayDesc: 'If campaign is not running at least 7 days then indicator will be Gray'
      },
      clientCall: {
        title: 'Last Clt. Call',
        description: 'This indicator takes into account the last client call date the ME logs in Salesforce as well as the Requested Communication Frequency set for the client in Salesforce. The alert shows red when the client has not had a call logged in the time frame set.'
      },
      lastDaySpend: {
        title: 'Last Day Spend',
        description: 'Recent date when amount spend on campaign.'
      },
      reviewed: {
        title: 'Reviewed',
        description: 'When the user marks the campaign as reviewed, the reviewed indicator will display for 21 days before resetting. This is meant to be a quick indicator of campaigns that have been recently checked.'
      }
    }
  },
  searchDashboard: {
    searchDashboard: 'Search Dashboard',
    references: 'References:',
    searchDashboardLogic: 'Search Dashboard Logic',
    decisionTree: 'Campaign Management Decision Tree',
    firstCycle: 'First Cycle',
    secondCycle: 'Second Cycle',
    platform: 'Platform',
    cp: 'CP',
    dmc: 'DMC',
    tableHeader: {
      CID: 'CID',
      campaignName: 'Campaign Name',
      priority: 'Priority',
      budget: 'Budget',
      csScore: 'Clt. Set. Score',
      performance: 'Performance',
      CPL: 'CPL',
      cplTrend: 'CPL Trend',
      utilization: 'Utilization',
      moneyClick: '$/Click',
      moneyCall: '$/Call',
      CTR: 'CTR',
      avgQS: 'Avg. QS',
      clickLead: 'Click/Lead',
      budgetScore: 'Budget Score',
      alerts: 'Alerts',
      lastCltCall: 'Last Clt. Call',
      reviewed: 'Reviewed'
    },
    popovers: {
      alert: {
        title: 'Alerts',
        description: 'Hover over the alert icon to see details on additional alerts triggered for the campaign.'
      },
      avgQS: {
        title: 'Avg. QS',
        description: 'Average Quality Score (Google only, weighted by impressions)',
        allCycles: 'For All Cycles',
        redDesc: 'QS is NULL (i.e. N/A) or QS < 5 = Red',
        greenDesc: 'QS >= 6 = Green',
        yellowDesc: 'Else Yellow'
      },
      budget: {
        title: 'Budget',
        description: 'Current budget of the campaign'
      },
      budgetScore: {
        title: 'Budget Score',
        description: 'budget score reflects how correctly the campaign is budgeted in comparison to other campaigns in the business subcategory. It is not reflective of targeting or location - it is solely intended as a quick way to signal to an ME that a campaign may be severely under-budgeted, so that the ME can evaluate and make the DMC aware if necessary. At this time, the scale does not indicate whether or not a campaign is over-budgeted.',
        allCycles: 'For All Cycles',
        redDesc: 'Budget < BSC Median * .5 = Red',
        yellowDesc: 'Budget < BSC Median * .75 = Yellow',
        greenDesc: 'Else Green',
        notes: 'This column sorts by % off from business subcategory median.'
      },
      CID: {
        title: 'CID',
        description: 'Campaign ID'
      },
      clickLead: {
        title: 'Click/Lead',
        description: 'Clicks Per Lead',
        firstSectionHeading: 'Cycle > 2',
        firstSectionRedDesc: 'Clicks / (Calls + Emails + Web Events) = NULL (i.e. N/A) or Clicks / (Calls + Emails + Web Events) > BSC Median * 1.5 = Red',
        firstSectionYellowDesc: 'Clicks / (Calls + Emails + Web Events) > 1.25 = Yellow',
        firstSectionGreenDesc: 'Else Green',
        secondSectionHeading: 'Cycle 1 & 2',
        secondSectionRedDesc: 'Clicks / (Calls + Emails + Web Events) = NULL (i.e. N/A) or Clicks / (Calls + Emails + Web Events) > BSC Median * 1.5 or Campaign Cycle < 3 and Clicks/Lead > BSC Median * 3 = Red',
        secondSectionYellowDesc: 'Clicks / (Calls + Emails + Web Events) > 1.25 or Campaign Cycle < 3 and Clicks/Lead > BSC Median * 2 = Yellow',
        secondSectionGreenDesc: 'Else Green',
        notes: 'This column sorts by % off from business subcategory median.'
      },
      cltSetScore: {
        title: 'Clt. Set. Score',
        description: 'Client Sentiment Score is an indicator of how the client feels about their campaign on a scale from 1-3, where 1 is poor and 3 is good. ME inputs this value into Salesforce as Client Disposition Score when logging a call with the client, and the most recent value logged is used for the alert.'
      },
      clientCall: {
        title: 'Last Clt. Call',
        description: 'This indicator takes into account the last client call date the ME logs in Salesforce as well as the Requested Communication Frequency set for the client in Salesforce. The alert shows red when the client has not had a call logged in the time frame set.'
      },
      costCall: {
        title: '$/Call',
        description: 'Cost Per Call',
        firstSectionHeading: 'Cycle > 2',
        firstSectionRedDesc: 'Spend / Calls = NULL (i.e. N/A) or Spend / Calls > BSC Median * 1.5 = Red',
        firstSectionYellowDesc: 'Spend / Calls > BSC Median * 1.25 = Yellow',
        firstSectionGreenDesc: 'Else Green',
        secondSectionHeading: 'Cycle 1 & 2',
        secondSectionRedDesc: 'Spend / Calls = NULL (i.e. N/A) or Spend / Calls > BSC Median * 1.5 or Campaign Cycle < 3 and $/Call > BSC Median * 3 = Red',
        secondSectionYellowDesc: 'Spend / Calls > BSC Median * 1.25 or Campaign Cycle < 3 and $/Call > BSC Median * 2 = Yellow',
        secondSectionGreenDesc: 'Else Green',
        notes: 'This column sorts by % off from business subcategory median.'
      },
      costClick: {
        title: '$/Click',
        description: 'Cost Per Click',
        firstSectionHeading: 'Cycle > 2',
        firstSectionRedDesc: 'Spend / Clicks = NULL or Spend / Clicks > BSC Median * 1.5 = Red',
        firstSectionYellowDesc: 'Spend / Clicks > BSC Median * 1.25 = Yellow',
        firstSectionGreenDesc: 'Else Green',
        secondSectionHeading: 'Cycle 1 & 2',
        secondSectionRedDesc: 'Spend / Clicks = NULL or Spend / Clicks > BSC Median * 1.5 or Campaign Cycle < 3 and CPC > BSC Median * 3 = Red',
        secondSectionYellowDesc: 'Spend / Clicks > BSC Median * 1.25 or Campaign Cycle < 3 and CPC > BSC Median * 2 = Yellow',
        secondSectionGreenDesc: 'Else Green',
        notes: 'This column sorts by % off from business subcategory median.'
      },
      CPL: {
        title: '$/Lead',
        description: 'Cost Per Lead',
        firstSectionHeading: 'Cycle > 2',
        firstSectionRedDesc: 'Spend / (Calls + Emails + Web Events) = NULL (i.e. N/A) or (Spend / (Calls + Emails + Web Events) ) > BSC Median * 1.5 = Red',
        firstSectionYellowDesc: 'Spend / (Calls + Emails + Web Events) > BSC Median * 1.25 = Yellow',
        firstSectionGreenDesc: 'Else Green',
        secondSectionHeading: 'Cycle 1 & 2',
        secondSectionRedDesc: 'Spend / (Calls + Emails + Web Events) = NULL (i.e. N/A) or (Spend / (Calls + Emails + Web Events) ) > BSC Median * 1.5 or Campaign Cycle < 3 and CPL > BSC Median * 3 = Red',
        secondSectionYellowDesc: 'Spend / (Calls + Emails + Web Events) > BSC Median * 1.25 or Campaign Cycle < 3 and the CPL > BSC Median * 2 = Yellow',
        secondSectionGreenDesc: 'Else Green',
        firstNotes: '* If the campaign has a set CPL goal, it will be used. If not, the historical CPL (from one year ago) will be used. Otherwise the BSC Median is used. If the alert or priority seems off, consider setting/ re-evaluating the CPL goal with the client.',
        secondNotes: 'This column sorts by % off from target (CPL goal, historical CPL or business subcategory median as per alert logic).'
      },
      cplTrend: {
        title: 'CPL Trend',
        description: 'This score reflects the Cost Per Lead  trending over the last two weeks.',
        redDesc: 'Alert = Significantly Worse or Moderately Worse = Red',
        yellowDesc: 'Alert = Worse = Yellow',
        greenDesc: 'Else Green'
      },
      CTR: {
        title: 'CTR',
        description: 'Click-through Rate',
        firstSectionHeading: 'Cycle > 2',
        firstSectionRedDesc: 'Clicks / Impressions = NULL (i.e. N/A) or Clicks / Impressions < BSC Median * .5 = Red',
        firstSectionYellowDesc: 'Clicks / Impressions < BSC Median * .75 = Yellow',
        firstSectionGreenDesc: 'Else Green',
        secondSectionHeading: 'Cycle 1 & 2',
        secondSectionRedDesc: 'Clicks / Impressions = NULL (i.e. N/A) or Clicks / Impressions < BSC Median * .5 or Campaign Cycle < 3 and CTR < BSC Median * .25 = Red',
        secondSectionYellowDesc: 'Clicks / Impressions < BSC Median * .75 or Campaign Cycle < 3 and CTR < BSC Median * .5 = Yellow',
        secondSectionGreenDesc: 'Else Green',
        notes: 'This column sorts by % off from business subcategory median.'
      },
      performance: {
        title: 'Performance',
        description: 'This is a relative metric we use in order to rank campaigns by priority. It is an internal-only metric that should not be communicated to clients or DMCs because it is only relevant to our internal ranking and not a standard, industry-recognized metric.',
        firstSection: 'The overall performance of a campaign is calculated by comparing the weighted mean of the contributing performance factor scores against the points possible.',
        secondSection: 'Weighted Mean = (CPL*25%) + (CPL Trend*20%) + (Utilization*15%) + (CPC*12.5%) + (Cost Per Call*10.5%) + (CTR*8%) + (QS*5%) + (Clicks Per Lead*2%) + (Budget*2%)',
        thirdSection: 'Points Possible = 3 Performance Score = Weighted Mean / Points Possible',
        redDesc: 'Poor(<=60%) = Red',
        yellowDesc: 'Average(>60% to <80%) = Yellow',
        greenDesc: 'Good(>=80%) = Green'
      },
      priority: {
        title: 'Priority',
        description: 'The order of priority in which the campaign should be reviewed. The rank or, "priority," of each campaign is determined by the budget size and the overall performance score, so that the higher the budget and the lower the performance score, the higher the rank is. Priority = budget / (performance*sentiment)'
      },
      reviewed: {
        title: 'Reviewed',
        description: 'When the user marks the campaign as reviewed, the reviewed indicator will display for 21 days before resetting. This is meant to be a quick indicator of campaigns that have been recently checked.'
      },
      utilization: {
        title: 'Utilization',
        firstSectionHeading: 'Cycle > 2',
        firstSectionRedDesc: 'Utilization % < 80% or > 120% = Red',
        firstSectionYellowDesc: 'Utilization % Range < 90% or > 110% = Yellow',
        firstSectionGreenDesc: 'Else Green',
        secondSectionHeading: 'Cycle 1 & 2',
        secondSectionRedDesc: 'Utilization = NULL or Campaign Cycle < 3 and Utilization % < 50% or > 150% or Utilization % < 80% or > 120% = Red',
        secondSectionYellowDesc: 'Campaign Cycle < 3 and Utilization % < 60% or > 140% or Utilization < 90% or > 110% = Yellow',
        secondSectionGreenDesc: 'Else Green'
      }
    }
  }
};
