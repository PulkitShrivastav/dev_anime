import { Component, inject, ViewChild, ElementRef, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FilesService } from '../../AppServices/files-service';
import { debounceTime, distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { AppSyncService } from '../../AppServices/app-sync-service';

@Component({
  selector: 'app-text-editor-comp',
  imports: [NgClass],
  template: `
    <div #editorDiv id="editorDiv"
    [ngClass]="isCode() ? 'opacity-1' : 'opacity-0 -z-[10] disabled'"
    class="h-full w-full flex items-center justify-center">
    </div>
  `,
  styles: ``,
})
export class TextEditorComp {

  @ViewChild('editorDiv') editorDiv!: ElementRef<HTMLDivElement>;

  editor: any
  fileServ = inject(FilesService)
  appSyncServ = inject(AppSyncService)
  save$ = new Subject<string>()
  checkEditContent: any = ''
  editors = ['html', 'css', 'javascript']
  editor_models: { [key: string]: any } = {}
  isloadCode = signal<boolean>(false)
  isCode = signal<boolean>(false)
  isLoadedOnce = false

  launchEditor() {
    const loaderScript = document.createElement('script');
    loaderScript.type = 'text/javascript';
    loaderScript.src = 'assets/monaco/loader.js';
    loaderScript.onload = () => {
      (window as any).require.config({ paths: { vs: 'assets/monaco' } });
      (window as any).require(['vs/editor/editor.main'], () => {
        this.launchMonaco()
      });
    };
    document.body.appendChild(loaderScript);

    this.save$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.fileServ.destroys$)
    ).subscribe(content => {
      if (this.isloadCode()) { return }
      this.fileServ.saveCode(
        this.appSyncServ.activeFile().file_name,
        this.appSyncServ.isSelected(),
        content,
        this.appSyncServ.didDivChange()
      )
    })
  }

  launchMonaco() {
    // this.isLoadedOnce = true
    const monacoInstance = (window as any).monaco
    this.editors.forEach(edit => {
      this.editor_models[edit] = monacoInstance.editor.createModel("", edit)
    })
    this.editor = monacoInstance.editor.create(this.editorDiv?.nativeElement, {
      model: this.editor_models['html'],
      theme: 'vs-dark',
      fontSize: 14,
      minimap: { enabled: false },
      fontFamily: 'Josefin Sans, sans-serif',
      lineHeight: 22,
      smoothScrolling: true,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      padding: { top: 12, bottom: 12 },
      roundedSelection: true,
      scrollbar: {
        verticalScrollbarSize: 6,
        horizontalScrollbarSize: 6
      }
    })
    this.checkEditContent = this.editor.onDidChangeModelContent(() => { this.save$.next(this.editor.getValue()); })
    this.loadCode(this.appSyncServ.activeFile().file_name, 'html', this.editor_models['html'])
    this.launchTags()
    this.launchMonacoStyles()
  }

  launchTags() {
    const monaco = (window as any).monaco
    const HTML_TAGS = [
      'div', 'span', 'section', 'header', 'footer',
      'main', 'article', 'aside', 'nav',
      'button', 'a', 'p', 'h1', 'h2', 'h3',
      'ul', 'ol', 'li',
      'form', 'label', 'input', 'textarea',
      'img', 'video', 'audio'
    ];
    const VOID_TAGS = new Set(['img', 'input', 'br', 'hr', 'meta', 'link']);
    monaco.languages.registerCompletionItemProvider('html', {
      provideCompletionItems: () => ({
        suggestions: HTML_TAGS.map(tag => ({
          label: tag,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: VOID_TAGS.has(tag)
            ? `<${tag} />`
            : `<${tag}>$0</${tag}>`,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        }))
      })
    });
  }

  launchMonacoStyles() {
    const monaco = (window as any).monaco
    monaco.editor.defineTheme('riva-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '#fd93c6', fontStyle: 'italic' },
        { token: 'keyword', foreground: '#c7549d' },
        { token: 'string', foreground: '#f7716a' },
        { token: 'number', foreground: '#ffb703' },
        { token: 'tag', foreground: '#c7549d' },
        { token: 'attribute.name', foreground: '#c09ddb' },
        { token: 'attribute.value', foreground: '#ded6b4' },
      ],
      colors: {
        'editor.background': '#12091a',
        'editor.foreground': '#ded6b4',
        'editorCursor.foreground': '#ffb703',
        'editorLineNumber.foreground': '#6a7987',
        'editor.lineHighlightBackground': '#261f2c',
        'editor.selectionBackground': '#d79fbaa5',
        'editor.inactiveSelectionBackground': '#d79fba5a',
      }
    });
    monaco.editor.setTheme('riva-dark');
  }

  loadCode(filename: string, keyname: string, editModel: any) {
    if (!this.editor || !editModel) { return }

    let value = localStorage.getItem(`${filename}_${keyname}`)
    this.isloadCode.set(true)
    this.editor.setModel(editModel)
    this.editor.getModel()?.setValue(value ?? '')
    queueMicrotask(() => { this.isloadCode.set(false) })
  }

  onFileChange() {
    let newModel: any = ''
    if (this.appSyncServ.isSelected() === 'js') {
      newModel = this.editor_models['javascript']
    } else {
      newModel = this.editor_models[this.appSyncServ.isSelected()]
    }
    this.loadCode(this.appSyncServ.activeFile().file_name, this.appSyncServ.isSelected(), newModel)
  }

  ngOnInit() {
    this.launchEditor()
  }

  ngOnDestroy() {
    this.fileServ.destroys$.next()
    this.fileServ.destroys$.complete()
    this.checkEditContent.dispose()
    this.editor.dispose()
  }

}
