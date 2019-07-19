import {
  ContentBody,
  ParagraphType,
  TitleType
} from "../../../../components/Content/index";

export const data: ContentBody = {
  sections: [
    {
      paragraphs: [
        {
          sentences: [
            {
              content: "best way to get your life together",
              type: ParagraphType.Phrase
            }
          ]
        }
      ],
      title: "Do This",
      titleType: TitleType.H1
    },
    {
      paragraphs: [
        {
          sentences: [
            {
              content: "first paragraph",
              type: ParagraphType.Phrase
            },
            {
              content: "nav here",
              onPress: () => undefined,
              type: ParagraphType.Link
            },
            {
              content: "blah bldah blah. blah blah blah",
              type: ParagraphType.Phrase
            }
          ]
        },
        {
          sentences: [
            {
              content: "second paragraph",
              type: ParagraphType.Phrase
            },
            {
              content: "nav here",
              onPress: () => undefined,
              type: ParagraphType.Link
            },
            {
              content:
                "blah blah da donas odinasod nasn dioaondlah. blah bl asdoi asnd oasnd oansod naosdn oasnodi nasoidn oias as dasoidn asoidn oaah blah",
              type: ParagraphType.Phrase
            }
          ]
        }
      ],
      title: "H2 title",
      titleType: TitleType.H3
    },
    {
      paragraphs: [
        {
          sentences: [
            {
              content: "first paragraph",
              type: ParagraphType.Phrase
            },
            {
              content: "nav here",
              onPress: () => undefined,
              type: ParagraphType.Link
            },
            {
              content: "blah bldah blah. blah blah blah",
              type: ParagraphType.Phrase
            }
          ]
        },
        {
          sentences: [
            {
              content: "second paragraph",
              type: ParagraphType.Phrase
            },
            {
              content: "nav here",
              onPress: () => undefined,
              type: ParagraphType.Link
            },
            {
              content:
                "blah blah da donas odinasod nasn dioaondlah. blah bl asdoi asnd oasnd oansod naosdn oasnodi nasoidn oias as dasoidn asoidn oaah blah",
              type: ParagraphType.Phrase
            }
          ]
        },
        {
          sentences: [
            {
              content: "third paragraph",
              type: ParagraphType.Phrase
            },
            {
              content: "nav here",
              onPress: () => undefined,
              type: ParagraphType.Link
            },
            {
              content:
                "blah blah da donas odinasod nasn dioaondlah. blah bl asdoi asnd oasnd oansod naosdn oasnodi nasoidn oias as dasoidn asoidn oaah blah",
              type: ParagraphType.Phrase
            }
          ]
        }
      ],
      title: "H3 content ",
      titleType: TitleType.H3
    },
    {
      paragraphs: [
        {
          sentences: [
            {
              content: "first paragraph",
              type: ParagraphType.Phrase
            },
            {
              content: "nav here",
              onPress: () => undefined,
              type: ParagraphType.Link
            },
            {
              content: "blah bldah blah. blah blah blah",
              type: ParagraphType.Phrase
            }
          ]
        },
        {
          sentences: [
            {
              content: "second paragraph",
              type: ParagraphType.Phrase
            },
            {
              content: "nav herhere",
              onPress: () => alert("here"),
              type: ParagraphType.Link
            },
            {
              content:
                "blah blah da donas odinasod nasn dioaondlah. blah bl asdoi asnd oasnd oansod naosdn oasnodi nasoidn oias as dasoidn asoidn oaah blah",
              type: ParagraphType.Phrase
            }
          ]
        },
        {
          sentences: [
            {
              content: "third paragraph",
              type: ParagraphType.Phrase
            },
            {
              content: "nav here",
              onPress: () => undefined,
              type: ParagraphType.Link
            },
            {
              content:
                "blah blah da donas odinasod nasn dioaondlah. blah bl asdoi asnd oasnd oansod naosdn oasnodi nasoidn oias as dasoidn asoidn oaah blah",
              type: ParagraphType.Phrase
            }
          ]
        }
      ],
      title: "H3 content ",
      titleType: TitleType.H3
    }
  ]
};
